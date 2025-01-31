const express = require('express');
const roleController = require('../controllers/admin/roleController');
const router = express.Router();

// Endpoint untuk create role
router.post('/role', roleController.createRole);

// Endpoint untuk mendapatkan semua roles
router.get('/role', roleController.getAllRoles);

// Endpoint untuk mendapatkan role berdasarkan ID
router.get('/role/:id', roleController.getRoleById);

// Endpoint untuk update role berdasarkan ID
router.put('/role/:id', roleController.updateRole);

// Endpoint untuk menghapus role berdasarkan ID
router.delete('/role/:id', roleController.deleteRole);

module.exports = router;
