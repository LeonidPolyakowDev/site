const mongoose = require('mongoose');

const TokenScheme = new mongoose.Schema({
    tokenId: String,
    userId: String
});

mongoose.model('Token', TokenScheme);
