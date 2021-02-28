const mongoose = require('mongoose');

const PostScheme = new mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: { type: Date, default: Date.now},
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

mongoose.model('Post', PostScheme);