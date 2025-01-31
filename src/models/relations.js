const User = require('./User'); // Tanpa .js
const Pegawai = require('./Pegawai'); // Tanpa .js
const Role = require('./Role'); // Tanpa .js
const Video = require('./Video');
// Relasi User dan Pegawai (One-to-One)
// Di sini User memiliki id_pegawai yang merujuk ke Pegawai
User.hasOne(Pegawai, { foreignKey: 'id_pegawai' });
Pegawai.belongsTo(User, { foreignKey: 'id_pegawai' }); // Menghapus 'user_id' karena relasi ini sudah dilakukan dengan 'id_pegawai'

// Relasi Role dan User (Many-to-Many)
Role.belongsToMany(User, { through: 'User_Role', foreignKey: 'id_role' });
User.belongsToMany(Role, { through: 'User_Role', foreignKey: 'user_id' });

// Relasi User dan KontenVideo (One-to-Many)
User.hasMany(Video, { foreignKey: 'id_user' });
Video.belongsTo(User, { foreignKey: 'id_user' });

module.exports = { User, Pegawai, Role, Video }; // Ekspor model
