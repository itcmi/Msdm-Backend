const express = require('express');
const router = express.Router();
const videoController = require('../controllers/konten/videoController');
const isAdmin = require('../middleware/isAdmin');

// Mendapatkan semua video
router.get('/video', videoController.getVideos);

// Menambahkan video baru
router.post('/video', videoController.addVideo);

// Mengupdate video berdasarkan ID
router.put('/video/:id', videoController.updateVideo);

// Menghapus video berdasarkan ID
router.delete('/video/:id', videoController.deleteVideo);

// Endpoint untuk mengubah isshow
router.patch('/video/:id/isshow', isAdmin, videoController.updateIsshow);

module.exports = router;
