const getAllPosts = (req, res) => {
    res.status(200).json({
        success: true, 
        data: "Fetching all blog posts from the modular router!"
    });
};

const getPostById = (req, res) => {
    const postId = req.params.id; 
    res.status(200).json({
        success: true,
        data: {
            message: `Fetching data for post with ID: ${postId}`
        }
    });
};

// ✅ ADD THESE FUNCTIONS

const createPost = (req, res) => {
    res.status(201).json({
        success: true,
        data: {
            message: "Post created successfully"
        }
    });
};

const updatePost = (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            message: "Post updated successfully"
        }
    });
};

const deletePost = (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            message: "Post deleted successfully"
        }
    });
};

// ✅ EXPORT ALL
module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};