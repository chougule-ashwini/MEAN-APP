const mongoose = require("mongoose");

//create schema of your data
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('post', postSchema);