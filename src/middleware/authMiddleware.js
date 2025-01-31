const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/dotenv');

exports.authMiddleware = (req, res, next) => {
  const token =
    req.cookies?.token || // Ambil token dari cookie
    req.headers.authorization?.split(' ')[1]; // Atau dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifikasi token
    req.user = decoded; // Tambahkan data pengguna ke req
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};
