require('dotenv').config(); // ✅ Load env variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const mainRouter = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ DB Connected'))
  .catch((err) => console.log('❌ DB Error:', err));

// Global Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Blogify API'
  });
});

// Master Router
app.use('/api/v1', mainRouter);

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});