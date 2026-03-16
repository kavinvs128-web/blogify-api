const express = require('express');
const app = express();
const PORT = 3000;

const postRouter = require('./routes/posts.routes');
const userRouter = require('./routes/user.routes');

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Blogify API!');
});

// Mount router
app.use('/api/v1/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});