const Video = require('../../models/Video'); // Import model Video

// Mendapatkan semua video
const getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json({
      message: 'Daftar video berhasil didapatkan.',
      videos,
    });
  } catch (error) {
    console.error('Error saat mendapatkan video:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mendapatkan video.',
      error: error.message,
    });
  }
};

// Menambahkan video baru
const addVideo = async (req, res) => {
  try {
    const { title, platform, url, id_user } = req.body;

    // Validasi platform
    if (!['youtube', 'tiktok'].includes(platform)) {
      return res.status(400).json({
        message: 'Platform harus berupa "youtube" atau "tiktok".',
      });
    }

    const video = await Video.create({
      title,
      platform,
      url,
      id_user,
      isshow: false, // Default isshow false
    });

    res.status(201).json({
      message: 'Video berhasil ditambahkan.',
      video,
    });
  } catch (error) {
    console.error('Error saat menambahkan video:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan video.',
      error: error.message,
    });
  }
};

// Mengupdate video berdasarkan ID
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, platform, url } = req.body;

    // Validasi platform
    if (platform && !['youtube', 'tiktok'].includes(platform)) {
      return res.status(400).json({
        message: 'Platform harus berupa "youtube" atau "tiktok".',
      });
    }

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: 'Video tidak ditemukan.' });
    }

    video.title = title || video.title;
    video.platform = platform || video.platform;
    video.url = url || video.url;

    await video.save();

    res.status(200).json({
      message: 'Video berhasil diperbarui.',
      video,
    });
  } catch (error) {
    console.error('Error saat memperbarui video:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui video.',
      error: error.message,
    });
  }
};

// Menghapus video berdasarkan ID
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: 'Video tidak ditemukan.' });
    }

    await video.destroy();

    res.status(200).json({
      message: 'Video berhasil dihapus.',
    });
  } catch (error) {
    console.error('Error saat menghapus video:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus video.',
      error: error.message,
    });
  }
};

// Mengupdate kolom isshow berdasarkan ID
const updateIsshow = async (req, res) => {
  try {
    const { id } = req.params;
    const { isshow } = req.body;

    // Validasi isshow
    if (typeof isshow !== 'boolean') {
      return res.status(400).json({
        message: 'Nilai isshow harus berupa true atau false.',
      });
    }

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: 'Video tidak ditemukan.' });
    }

    video.isshow = isshow;
    await video.save();

    res.status(200).json({
      message: 'Status isshow berhasil diperbarui.',
      video,
    });
  } catch (error) {
    console.error('Error saat mengupdate isshow:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengupdate isshow.',
      error: error.message,
    });
  }
};

module.exports = {
  getVideos,
  addVideo,
  updateVideo,
  deleteVideo,
  updateIsshow,
};
