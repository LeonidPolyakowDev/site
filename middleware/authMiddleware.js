const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = (req, resp, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader)
        return resp.status(401).json({message: 'Token not provided'});

    const token = authHeader.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, config.get('jwtSecret'));
        if(payload.type !== 'access')
            return resp.status(401).json({message: 'Invalid token'})
    }
    catch (e) {
        return resp.status(401).json({message: 'Invalid token'})
    }
    next();
}