const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const authHelper = require('../helpers/authHelpers');
const router = Router();

const User = mongoose.model('User');
const Token = mongoose.model('Token');

const updateTokens = async (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken();
    await authHelper.replaceDbRefreshToken(refreshToken.id, userId);
    return {accessToken, refreshToken: refreshToken.token}
}

router.post('/signup', async (req, resp) => {
    try {
        const {login, password} = req.body;
        const userExist = await User.findOne(req.body);
        if (userExist)
            return resp.status(409).json({message: 'Уже существует пользователь с таким логином'});
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({login, password: hashedPassword});
        resp.json({message: "OK"});
    } catch (e) {
        console.error(e)
        resp.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/signin', async (req, resp) => {
    try {
        const {login, password} = req.body;
        const fUser = await User.findOne({login});
        if (!fUser)
            return resp.status(401).json({message: 'Неверный логин'});
        const isMatch = await bcrypt.compare(password, fUser.password);
        if (!isMatch)
            return resp.status(401).json({message: 'Неверный пароль'});
        const tokens = await updateTokens(fUser._id);
        resp.json(tokens);
    } catch (e) {
        console.error(e)
        resp.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/refreshTokens', async (req, resp) => {
    const {refreshToken} = req.body
    let payload;
    try {
        payload = await jwt.verify(refreshToken, config.get('jwtSecret'));
        if (payload.type !== 'refresh')
            return resp.status(400).json({message: 'Invalid token'});
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError)
            return resp.status(400).json({message: 'Token expired'});
        else if (e instanceof jwt.JsonWebTokenError)
            return resp.status(400).json({message: 'Invalid token'});
    }

    try {
        const fToken = await Token.findOne({tokenId: payload.id});
        if (!fToken)
            throw new Error('Invalid token');
        const tokens = await updateTokens(fToken.userId);
        return resp.json(tokens);
    } catch (e) {
        resp.status(400).json({message: e.message});
    }
})

module.exports = router