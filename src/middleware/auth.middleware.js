const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // 1. Read from cookies (PRIMARY METHOD)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Optional fallback (Postman/testing)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // No token found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

module.exports = protect;