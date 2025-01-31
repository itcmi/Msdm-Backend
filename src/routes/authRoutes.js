// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require ('../middleware/authMiddleware')

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/pegawai', authController.registerPegawai);
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'You are authenticated', user: req.user });
});

module.exports = router; // Ekspor router