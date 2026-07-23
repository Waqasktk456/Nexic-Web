const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const upload = require('../middleware/upload');

// Get all team members
router.get('/', teamController.getAllTeamMembers);

// Get single team member
router.get('/:id', teamController.getTeamMemberById);

// Create team member
router.post('/', upload.single('image'), teamController.createTeamMember);

// Update team member
router.put('/:id', upload.single('image'), teamController.updateTeamMember);

// Delete team member
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;
