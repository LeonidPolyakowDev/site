const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User', UserScheme);
