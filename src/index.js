const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const mainRouter = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// Global Middleware
app.use(cors());
app.use(express.json());

// Welcome route (optional but keep clean JSON)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Blogify API'
  });
});

// Master Router
app.use('/api/v1', mainRouter);

// Error Handler (VERY IMPORTANT - LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});