const Post = require('../models/post.model');

require('../models/user.model');

exports.createPost = (data) => Post.create(data);

exports.getAllPosts = () =>
    Post.find().populate('author');

exports.getPostById = (id) =>
    Post.findById(id).populate('author');

exports.updatePost = (id, data) =>
    Post.findByIdAndUpdate(id, data, { new: true });

exports.deletePost = (id) =>
    Post.findByIdAndDelete(id);