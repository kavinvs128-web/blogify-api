const postService = require('../services/posts.service');

// CREATE
const createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ALL
const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET BY ID
const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE
const updatePost = async (req, res) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE
const deletePost = async (req, res) => {
    try {
        const post = await postService.deletePost(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};