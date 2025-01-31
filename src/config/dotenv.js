const dotenv = require('dotenv');

dotenv.config();
console.log('DB_NAME:', process.env.DB_NAME); // Tambahkan ini untuk debugging
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const PORT_SERVER = process.env.PORT_SERVER;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

module.exports = { DB_HOST, DB_USER, DB_PASS, DB_NAME, PORT_SERVER, JWT_SECRET, JWT_EXPIRES_IN };
