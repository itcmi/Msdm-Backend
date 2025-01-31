// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Routes
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes')
require('dotenv').config();
//backend begin
const app = express();
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(bodyParser.json());

// Middleware untuk mengurai body request URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Prefix untuk API
app.use('/api/auth', authRoutes); // Semua route di `authRoutes` dimulai dengan `/api/auth`
app.use('/api/admin', roleRoutes);
app.use('/api/pengguna', userRoutes);
app.use('/api/konten', videoRoutes
)

// Middleware untuk menangani route yang tidak ditemukan
app.use((req, res, next) => {
      res.status(404).json({ message: 'Route not found' });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'There something wrong with our server' });
});

// Ekspor app untuk digunakan di file lain
module.exports = app;