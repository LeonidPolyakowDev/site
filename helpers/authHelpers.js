const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
const config = require('config');
const secret = config.get("jwtSecret");
const mongoose = require('mongoose');

const Token = mongoose.model('Token');

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: config.get("accessToken.type")
    }
    const options = {expiresIn: config.get("accessToken.expiresIn")};

    return jwt.sign(payload, secret, options);
}

const generateRefreshToken = () => {
    const payload = {
        id: uuidv4(),
        type: config.get("refreshToken.type")
    }
    const options = {expiresIn: config.get("refreshToken.expiresIn")};

    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options),
    };
}

const replaceDbRefreshToken = async (tokenId, userId) => {
    await Token.findOneAndRemove({userId});
    await Token.create({tokenId, userId})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken
};