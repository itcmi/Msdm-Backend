const Role = require('../../models/Role'); // Mengimpor model Role


// CREATE - Menambah role baru
const { body, validationResult } = require('express-validator');

exports.createRole = [
  // Validate and sanitize input
  body('name').notEmpty().withMessage('Role name is required').trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;
      const newRole = await Role.create({ name });
      return res.status(201).json(newRole);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating role' });
    }
  }
];

// READ - Mendapatkan semua roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching roles' });
  }
};

// READ - Mendapatkan role berdasarkan ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.status(200).json(role);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching role' });
  }
};

// UPDATE - Mengupdate role berdasarkan ID
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    role.name = name || role.name;

    await role.save();

    return res.status(200).json(role);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating role' });
  }
};

// DELETE - Menghapus role berdasarkan ID
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await role.destroy();

    return res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting role' });
  }
};
