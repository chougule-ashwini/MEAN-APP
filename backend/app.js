const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Post = require('./models/post');

const app = express();
const uri = 'mongodb+srv://admin:pass@projectcluster.7shkv.mongodb.net/node-angular?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((e) => {
        console.log('Connection failed', e);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//midleware to accept CORS in header to all url
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //Allow incoming extra headers
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
app.post('/api/post', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save();
    res.status(201).json({ message: 'Post added successfully' });
});
app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        });
    });
});

//exports app.js
module.exports = app;