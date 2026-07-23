const express = require('express');
const router = express.Router();
const websitesController = require('../controllers/websitesController');
const upload = require('../middleware/upload');

// Get all websites
router.get('/', websitesController.getAllWebsites);

// Get single website by ID
router.get('/:id', websitesController.getWebsiteById);

// Create new website with images
router.post('/', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), websitesController.createWebsite);

// Update website
router.put('/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), websitesController.updateWebsite);

// Delete website
router.delete('/:id', websitesController.deleteWebsite);

// Delete gallery image
router.delete('/:websiteId/images/:imageId', websitesController.deleteGalleryImage);

module.exports = router;
