const isAdmin = (req, res, next) => {
    const { role } = req.user; // Asumsi role user disimpan di req.user
  
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa melakukan perubahan ini.' });
    }
  
    next(); // Lanjut ke handler berikutnya jika user adalah admin
  };
  
  module.exports = isAdmin;
  