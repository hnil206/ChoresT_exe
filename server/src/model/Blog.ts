const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    date: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        default: 12,
    },
    likes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
