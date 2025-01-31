// src/config/db.js

const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('./dotenv'); // Tanpa .js

// Membuat koneksi ke database MySQL
const sequelize = new Sequelize(
  DB_NAME,     // Nama database
  DB_USER,     // User database
  DB_PASS,     // Password database
  {
    host: DB_HOST,  // Host database (misalnya 'localhost')
    dialect: 'mysql',           // Gunakan MySQL sebagai dialek
    logging: false,             // Menonaktifkan logging query, bisa diaktifkan untuk debugging
  }
);
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection failed:', err));


module.exports = sequelize; // Ekspor sequelize