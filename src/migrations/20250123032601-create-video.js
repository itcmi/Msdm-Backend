'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      platform: {
        type: DataTypes.ENUM('youtube', 'tiktok'), // ENUM dengan nilai 'youtube' dan 'tiktok'
        allowNull: false, // Kolom tidak boleh kosong
      },      
      url: {
        type: Sequelize.STRING
      },
      isshow: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_user: {
        type: Sequelize.BIGINT.UNSIGNED,  // Gunakan Sequelize di sini, bukan DataTypes
        allowNull: false,
        references: {
          model: 'users', // Nama tabel yang dirujuk
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Videos');
  }
};
