const websitesService = require('../services/websitesService');

// Get all websites
exports.getAllWebsites = async (req, res) => {
  try {
    const { search, category, status, featured } = req.query;
    
    const filters = {
      search: search || null,
      category: category || null,
      status: status || null,
      featured: featured === 'true' ? true : featured === 'false' ? false : null
    };

    const websites = await websitesService.getAllWebsites(filters);
    
    res.json({
      success: true,
      data: websites
    });
  } catch (error) {
    console.error('Get websites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch websites',
      error: error.message
    });
  }
};

// Get website by ID
exports.getWebsiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const website = await websitesService.getWebsiteById(id);
    
    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    res.json({
      success: true,
      data: website
    });
  } catch (error) {
    console.error('Get website error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch website',
      error: error.message
    });
  }
};

// Create new website
exports.createWebsite = async (req, res) => {
  try {
    const websiteData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price) || 0,
      demo_url: req.body.demo_url || null,
      github_url: req.body.github_url || null,
      details_page: req.body.details_page || null,
      featured: req.body.featured === 'true',
      status: req.body.status || 'draft'
    };

    // Validate required fields
    if (!websiteData.title || !websiteData.description || !websiteData.category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and category are required'
      });
    }

    const files = req.files;
    
    const website = await websitesService.createWebsite(websiteData, files);

    res.status(201).json({
      success: true,
      message: 'Website created successfully',
      data: website
    });
  } catch (error) {
    console.error('Create website error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create website',
      error: error.message
    });
  }
};

// Update website
exports.updateWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    
    const websiteData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price) || 0,
      demo_url: req.body.demo_url || null,
      github_url: req.body.github_url || null,
      details_page: req.body.details_page || null,
      featured: req.body.featured === 'true',
      status: req.body.status || 'draft'
    };

    const files = req.files;
    
    const website = await websitesService.updateWebsite(id, websiteData, files);

    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    res.json({
      success: true,
      message: 'Website updated successfully',
      data: website
    });
  } catch (error) {
    console.error('Update website error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update website',
      error: error.message
    });
  }
};

// Delete website
exports.deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    
    await websitesService.deleteWebsite(id);

    res.json({
      success: true,
      message: 'Website deleted successfully'
    });
  } catch (error) {
    console.error('Delete website error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete website',
      error: error.message
    });
  }
};

// Delete gallery image
exports.deleteGalleryImage = async (req, res) => {
  try {
    const { websiteId, imageId } = req.params;
    
    await websitesService.deleteGalleryImage(websiteId, imageId);

    res.json({
      success: true,
      message: 'Gallery image deleted successfully'
    });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete gallery image',
      error: error.message
    });
  }
};
