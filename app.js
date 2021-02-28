const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
require('./models');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect('mongodb://localhost/site-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`);
        })
    }
    catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();