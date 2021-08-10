const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
    const post = req.body;
    console.log(post);
    res.status(201).json({ message: 'Post added successfully' });
});
app.get('/api/posts', (req, res, next) => {
    const posts = [{
        id: 'fg5456ghgf', title: 'first post', content: 'This is my first post'
    },
    {
        id: 'hjgdfdfg4', title: 'second post', content: 'This is my second post'
    }];
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
    next();
});

//exports app.js
module.exports = app;