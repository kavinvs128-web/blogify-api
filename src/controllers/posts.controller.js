const getAllPosts = (req, res) => {
const posts = [
  { id: 1, title: 'Controller Post 1' },
  { id: 2, title: 'Controller Post 2' }
];

// The controller's job is to send the final response.
res.status(200).json({
  message: 'Posts fetched successfully',
  data: posts
});
};

// We export the function in an object so we can easily add more functions later.
module.exports = {
getAllPosts,
};