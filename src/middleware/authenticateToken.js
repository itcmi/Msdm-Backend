// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Token diambil dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifikasi token
    req.user = decoded; // Tambahkan data pengguna ke req
    next(); // Lanjutkan ke handler berikutnya
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
