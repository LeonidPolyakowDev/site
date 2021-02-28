const {Router} = require('express');
const authMiddlware = require('../middleware/authMiddleware')
const router = Router();
const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator');

const Post = mongoose.model('Post');

router.post('/create',
    authMiddlware,
    check(['title', 'text', 'author']).exists(),
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({errors: errors.array()});
        }
        try {
            await Post.create(req.body);
            resp.json({message: "OK"});
        } catch (e) {
            resp.status(500).json({message: 'Ошибка сервера'});
        }
    })

router.get('/all', authMiddlware, async (req, resp) => {
    try {
        const posts = await Post.find().sort({dateCreated: 1});
        resp.json(posts);
    } catch (e) {
        resp.status(500).json({message: 'Ошибка сервера'});
    }
})

router.get('/:id', /*authMiddlware,*/ async (req, resp) => {
    try {
        // const post = await Post.findById(req.params.id);
        // resp.json(post);
        const res = await Post.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId("6037b525bbb2fb0af85c2a95")
                }
            },
            {
                $lookup: {
                    "from": "users",
                    "localField": "author",
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            { "$unwind": "$user" }
        ]);
        resp.json(res);
    } catch (e) {
        resp.status(500).json({message: 'Ошибка сервера'});
    }
})

module.exports = router