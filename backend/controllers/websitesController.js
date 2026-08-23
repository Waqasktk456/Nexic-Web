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
    // Build websiteData with only provided fields
    const websiteData = {};
    
    // Required fields
    if (!req.body.title || !req.body.description || !req.body.category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and category are required'
      });
    }
    
    websiteData.title = req.body.title;
    websiteData.description = req.body.description;
    websiteData.category = req.body.category;
    
    // Optional basic fields
    if (req.body.price !== undefined) websiteData.price = parseFloat(req.body.price) || 0;
    if (req.body.demo_url !== undefined) websiteData.demo_url = req.body.demo_url || null;
    if (req.body.github_url !== undefined) websiteData.github_url = req.body.github_url || null;
    if (req.body.details_page !== undefined) websiteData.details_page = req.body.details_page || null;
    if (req.body.display_order !== undefined) websiteData.display_order = parseInt(req.body.display_order) || 999;
    if (req.body.featured !== undefined) websiteData.featured = req.body.featured === 'true' || req.body.featured === true;
    if (req.body.status !== undefined) websiteData.status = req.body.status || 'draft';
    
    // Optional detail page fields
    if (req.body.live_preview_url !== undefined) websiteData.live_preview_url = req.body.live_preview_url || null;
    if (req.body.category_tag !== undefined) websiteData.category_tag = req.body.category_tag || null;
    if (req.body.subtitle !== undefined) websiteData.subtitle = req.body.subtitle || null;
    if (req.body.feature_tags !== undefined) websiteData.feature_tags = req.body.feature_tags || null;
    if (req.body.long_description !== undefined) websiteData.long_description = req.body.long_description || null;
    if (req.body.rating !== undefined) websiteData.rating = req.body.rating ? parseFloat(req.body.rating) : null;
    if (req.body.license !== undefined) websiteData.license = req.body.license || null;
    if (req.body.updates !== undefined) websiteData.updates = req.body.updates || null;
    if (req.body.feature_pills !== undefined) websiteData.feature_pills = req.body.feature_pills || null;
    if (req.body.packages !== undefined) websiteData.packages = req.body.packages || null;
    if (req.body.resource_cards !== undefined) websiteData.resource_cards = req.body.resource_cards || null;

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
    
    // Only include fields that are actually provided
    const websiteData = {};
    
    if (req.body.title !== undefined) websiteData.title = req.body.title;
    if (req.body.description !== undefined) websiteData.description = req.body.description;
    if (req.body.category !== undefined) websiteData.category = req.body.category;
    if (req.body.price !== undefined) websiteData.price = parseFloat(req.body.price) || 0;
    if (req.body.demo_url !== undefined) websiteData.demo_url = req.body.demo_url || null;
    if (req.body.github_url !== undefined) websiteData.github_url = req.body.github_url || null;
    if (req.body.details_page !== undefined) websiteData.details_page = req.body.details_page || null;
    if (req.body.display_order !== undefined) websiteData.display_order = parseInt(req.body.display_order) || 999;
    if (req.body.featured !== undefined) websiteData.featured = req.body.featured === 'true' || req.body.featured === true;
    if (req.body.status !== undefined) websiteData.status = req.body.status || 'draft';
    
    // Detail page fields - only if provided
    if (req.body.live_preview_url !== undefined) websiteData.live_preview_url = req.body.live_preview_url || null;
    if (req.body.category_tag !== undefined) websiteData.category_tag = req.body.category_tag || null;
    if (req.body.subtitle !== undefined) websiteData.subtitle = req.body.subtitle || null;
    if (req.body.feature_tags !== undefined) websiteData.feature_tags = req.body.feature_tags || null;
    if (req.body.long_description !== undefined) websiteData.long_description = req.body.long_description || null;
    if (req.body.rating !== undefined) websiteData.rating = req.body.rating ? parseFloat(req.body.rating) : null;
    if (req.body.license !== undefined) websiteData.license = req.body.license || null;
    if (req.body.updates !== undefined) websiteData.updates = req.body.updates || null;
    if (req.body.feature_pills !== undefined) websiteData.feature_pills = req.body.feature_pills || null;
    if (req.body.packages !== undefined) websiteData.packages = req.body.packages || null;
    if (req.body.resource_cards !== undefined) websiteData.resource_cards = req.body.resource_cards || null;

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
