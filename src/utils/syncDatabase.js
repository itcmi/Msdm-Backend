const sequelize = require('../config/db'); // Tanpa .js
const { User, Pegawai, Role, KontenVideo } = require('../models/relations'); // Tanpa .js

async function syncDatabase() {
  try {
    // Remove the sync line
    // await sequelize.sync({ force: true }); // This line should be removed

    // Optionally, you can check if the connection is successful
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // If you want to run migrations, you can do so here
    // Uncomment the following line if you want to run migrations programmatically
    // await sequelize.getQueryInterface().showAllTables(); // This is just an example to show tables

    console.log('Database is ready to use!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

module.exports = { syncDatabase };