const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Tanpa .js

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,  // Mengubah dari ENUM ke STRING
    allowNull: false,
    unique: true, // Memastikan setiap role hanya ada satu
  },
}, {
  tableName: 'roles',
  timestamps: true,  // Jika Anda tidak ingin kolom timestamps, set false
});

module.exports = Role; // Ekspor Role
