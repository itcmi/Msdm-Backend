// src/models/Pegawai.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Tanpa .js
const Role = require('./Role'); // Tanpa .js
const bcrypt = require('bcryptjs');

const Pegawai = sequelize.define(
  'Pegawai',
  {
    no_pegawai: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    id_role: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'roles', // Nama tabel yang dirujuk
        key: 'id', // Kolom yang dirujuk
      }
    },
    nik: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Pastikan NIK unik
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jk: {
      type: DataTypes.ENUM('Pria', 'Wanita'),
      allowNull: false,
    },
    agama: {
      type: DataTypes.ENUM('Islam', 'Hindu', 'Budha', "Kristen", 'Katolik', 'Protestan', 'Konghucu'),
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tgl_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    alamat_ktp: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    alamat_dom: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Menikah', 'Lajang'),
      allowNull: false,
    },
    jml_anak: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_hp: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Pastikan email unik
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tgl_masuk: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    id_atasan: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    id_jabatan: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    id_divisi: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: 'pegawai',
    timestamps: true,
    paranoid: true,
  }
);

// Hook untuk mengenkripsi password sebelum menyimpan
Pegawai.beforeCreate(async (pegawai) => {
  const salt = await bcrypt.genSalt(10); // Menambah salt
  pegawai.password = await bcrypt.hash(pegawai.password, salt); // Mengenkripsi password
});

// Hook untuk mengenkripsi password saat data diupdate
Pegawai.beforeUpdate(async (pegawai) => {
  if (pegawai.changed('password')) {
    const salt = await bcrypt.genSalt(10); // Menambah salt
    pegawai.password = await bcrypt.hash(pegawai.password, salt); // Mengenkripsi password
  }
});

module.exports = Pegawai; // Ekspor Pegawai