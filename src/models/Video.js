// src/models/Video.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Koneksi database Anda

// Definisi model Video
const Video = sequelize.define(
  'Video',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Title tidak boleh kosong
    },
    platform: {
      type: DataTypes.ENUM('youtube', 'tiktok'), // ENUM untuk platform
      allowNull: false, // Kolom tidak boleh kosong
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false, // URL tidak boleh kosong
    },
    isshow: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Default false saat video baru diupload
      defaultValue: false,
    },
    id_user: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users', // Nama tabel yang dirujuk
        key: 'id', // Kolom primary key di tabel users
      },
    },
  },
  {
    tableName: 'videos', // Nama tabel di database
    timestamps: true, // Untuk createdAt dan updatedAt
  }
);

// Ekspor model Video
module.exports = Video;
