// src/server.js
const app = require('./app'); // Tanpa .js
const { PORT_SERVER } = require('./config/dotenv'); // Tanpa .js
const { syncDatabase } = require('./utils/syncDatabase'); // Tanpa .js

// Menyinkronkan database
syncDatabase();

app.listen(PORT_SERVER, () => {
  console.log(`Server running on http://localhost:${PORT_SERVER}`);
});