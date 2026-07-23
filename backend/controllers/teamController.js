const teamService = require('../services/teamService');

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await teamService.getAllTeamMembers();
    
    res.json({
      success: true,
      data: teamMembers
    });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team members',
      error: error.message
    });
  }
};

// Get team member by ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await teamService.getTeamMemberById(id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team member',
      error: error.message
    });
  }
};

// Create team member
exports.createTeamMember = async (req, res) => {
  try {
    const memberData = {
      name: req.body.name,
      role: req.body.role,
      portfolio_url: req.body.portfolio_url || null,
      display_order: parseInt(req.body.display_order) || 0
    };

    if (!memberData.name || !memberData.role) {
      return res.status(400).json({
        success: false,
        message: 'Name and role are required'
      });
    }

    const file = req.file;
    
    const teamMember = await teamService.createTeamMember(memberData, file);

    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add team member',
      error: error.message
    });
  }
};

// Update team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const memberData = {
      name: req.body.name,
      role: req.body.role,
      portfolio_url: req.body.portfolio_url || null,
      display_order: parseInt(req.body.display_order) || 0
    };

    const file = req.file;
    
    const teamMember = await teamService.updateTeamMember(id, memberData, file);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update team member',
      error: error.message
    });
  }
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    await teamService.deleteTeamMember(id);

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete team member',
      error: error.message
    });
  }
};
