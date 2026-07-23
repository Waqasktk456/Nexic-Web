const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Get all users
router.get('/', usersController.getAllUsers);

// Update user role
router.put('/:id/role', usersController.updateUserRole);

// Delete user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
