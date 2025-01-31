//authController.js

const User = require('../models/User'); // Pastikan path ini benar
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Ambil JWT_SECRET dan masa berlaku token dari .env
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/dotenv')

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, id_role: user.id_role },
      JWT_SECRET,
      { expiresIn: '15m' } // Akses token berlaku selama 15 menit
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '7d' } // Refresh token berlaku selama 7 hari
    );

    // Simpan refresh token di database
    await user.update({ token: refreshToken });

    // Simpan access token di cookie (opsional)
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 menit
    });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken, // Opsional: kirimkan refresh token ke frontend jika diperlukan
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};



exports.logout = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hapus refresh token di database
    await user.update({ token: null });

    // Hapus cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'An error occurred during logout' });
  }
};


exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const user = await User.findOne({ where: { token: refreshToken } });
    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verifikasi refresh token
    jwt.verify(refreshToken, JWT_SECRET);

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email, id_role: user.id_role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'An error occurred while refreshing token' });
  }
};


exports.registerPegawai = async (req, res) => {
  try {
    const {
      email,
      password,
      nama,
      nik,
      jk,
      agama,
      tempat_lahir,
      tgl_lahir,
      alamat_ktp,
      alamat_dom,
      status,
      jml_anak,
      no_hp,
      tgl_masuk,
      id_atasan,
      id_jabatan,
      id_divisi,
      path,
      id_role,
    } = req.body;

    // Validasi input
    if (!email || !password || !nama || !nik || !jk || !agama || !tgl_lahir || !status || !path || !id_role) {
      return res.status(400).json({
        success: false,
        message: 'Semua field wajib diisi.',
        errors: {
          email: !email ? 'Email is required.' : undefined,
          password: !password ? 'Password is required.' : undefined,
          nama: !nama ? 'Nama is required.' : undefined,
          nik: !nik ? 'NIK is required.' : undefined,
          jk: !jk ? 'Jenis Kelamin is required.' : undefined,
          agama: !agama ? 'Agama is required.' : undefined,
          tgl_lahir: !tgl_lahir ? 'Tanggal Lahir is required.' : undefined,
          status: !status ? 'Status is required.' : undefined,
          path: !path ? 'Path is required.' : undefined,
          id_role: !id_role ? 'ID Role is required.' : undefined,
        },
      });
    }

    // Periksa apakah email sudah terdaftar
    const existingPegawai = await Pegawai.findOne({ where: { email } });
    if (existingPegawai) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah digunakan.',
      });
    }

    // Buat pegawai baru
    const newPegawai = await Pegawai.create({
      email,
      password,
      nama,
      nik,
      jk,
      agama,
      tempat_lahir,
      tgl_lahir,
      alamat_ktp,
      alamat_dom,
      status,
      jml_anak,
      no_hp,
      tgl_masuk,
      id_atasan,
      id_jabatan,
      id_divisi,
      path,
      id_role,
    });

    // Buat user baru dengan id_pegawai sebagai id_user
    const newUser  = await User.create({
      id_pegawai: newPegawai.id, // Gunakan ID pegawai sebagai ID user
      email,
      password, // Password sudah dienkripsi oleh hook di model User
      id_role,
    });

    // Respon sukses
    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil.',
      data: {
        pegawai: {
          id: newPegawai.id,
          email: newPegawai.email,
          nama: newPegawai.nama,
        },
        user: {
          id: newUser .id,
          email: newUser .email,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server. Silakan coba lagi nanti.',
      error: error.message, // Optional: include error message for debugging
    });
  }
};
