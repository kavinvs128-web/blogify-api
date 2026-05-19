const postService = require('../services/posts.service');

// =======================
// CREATE POST
// =======================
const createPost = async (req, res) => {
    try {
        // IMPORTANT: attach logged-in user as author
        const postData = {
            ...req.body,
            author: req.user.id
        };

        const post = await postService.createPost(postData);

        res.status(201).json({
            success: true,
            data: post
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =======================
// GET ALL POSTS
// =======================
const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();

        res.status(200).json({
            success: true,
            data: posts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =======================
// GET POST BY ID
// =======================
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
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =======================
// UPDATE POST (AUTHORISED)
// =======================
const updatePost = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // AUTHORIZATION CHECK
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post"
            });
        }

        const updatedPost = await postService.updatePost(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            data: updatedPost
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =======================
// DELETE POST (AUTHORISED)
// =======================
const deletePost = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // AUTHORIZATION CHECK
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this post"
            });
        }

        await postService.deletePost(req.params.id);

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =======================
// EXPORTS
// =======================
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};