// src/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Tanpa .js
const bcrypt = require('bcryptjs');

const User = sequelize.define('User ', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pegawai: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: 'pegawai', // Nama tabel yang dirujuk
      key: 'id',
    },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_role: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: 'roles', // Pastikan nama tabel sesuai
      key: 'id',
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
});

// Hook untuk mengenkripsi password sebelum menyimpan
User .beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User; // Ekspor User