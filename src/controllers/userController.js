const User = require('../models/User'); // Import model User


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      message: 'Daftar semua user berhasil diambil.',
      data: users,
    });
  } catch (error) {
    console.error('Error saat mendapatkan daftar user:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil daftar user.',
      error: error.message,
    });
  }
};

/**
 * Mendapatkan detail user berdasarkan ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }
    res.status(200).json({
      message: 'Detail user berhasil diambil.',
      data: user,
    });
  } catch (error) {
    console.error('Error saat mendapatkan detail user:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil detail user.',
      error: error.message,
    });
  }
};

/**
 * Membuat user baru
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, dan password wajib diisi.',
      });
    }

    // Periksa jika email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email sudah digunakan.',
      });
    }

    // Buat user baru
    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User berhasil dibuat.',
      data: newUser,
    });
  } catch (error) {
    console.error('Error saat membuat user:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat membuat user.',
      error: error.message,
    });
  }
};

/**
 * Memperbarui data user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    // Perbarui data user
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    res.status(200).json({
      message: 'User berhasil diperbarui.',
      data: user,
    });
  } catch (error) {
    console.error('Error saat memperbarui user:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui user.',
      error: error.message,
    });
  }
};

/**
 * Menghapus user berdasarkan ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: `User dengan ID ${id} tidak ditemukan.`,
      });
    }

    // Hapus user
    await user.destroy();

    res.status(200).json({
      message: 'User berhasil dihapus.',
    });
  } catch (error) {
    console.error('Error saat menghapus user:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus user.',
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
