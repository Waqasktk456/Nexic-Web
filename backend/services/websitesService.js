const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Get all websites with filters
exports.getAllWebsites = async (filters) => {
  let query = supabase
    .from('websites')
    .select(`
      *,
      website_images (
        id,
        image_url,
        display_order
      )
    `)
    .order('display_order', { ascending: true })  // Order by display_order first
    .order('created_at', { ascending: false });    // Then by created_at for items with same display_order

  // Apply filters
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.featured !== null) {
    query = query.eq('featured', filters.featured);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }

  // Sort gallery images by display_order
  data.forEach(website => {
    if (website.website_images) {
      website.website_images.sort((a, b) => a.display_order - b.display_order);
    }
  });

  return data;
};

// Get website by ID
exports.getWebsiteById = async (id) => {
  const { data, error } = await supabase
    .from('websites')
    .select(`
      *,
      website_images (
        id,
        image_url,
        display_order
      )
    `)
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Database query failed: ${error.message}`);
  }

  if (data && data.website_images) {
    data.website_images.sort((a, b) => a.display_order - b.display_order);
  }

  return data;
};

// Upload image to Supabase Storage
const uploadImage = async (file, folder = 'websites') => {
  const fileExt = path.extname(file.originalname);
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('nexicweb-images')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('nexicweb-images')
    .getPublicUrl(filePath);

  return publicUrl;
};

// Delete image from Supabase Storage
const deleteImage = async (imageUrl) => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/nexicweb-images/');
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];

    await supabase.storage
      .from('nexicweb-images')
      .remove([filePath]);
  } catch (error) {
    console.error('Delete image error:', error);
  }
};

// Create new website
exports.createWebsite = async (websiteData, files) => {
  // Upload thumbnail
  if (!files || !files.thumbnail || files.thumbnail.length === 0) {
    throw new Error('Thumbnail image is required');
  }

  const thumbnailUrl = await uploadImage(files.thumbnail[0], 'websites/thumbnails');
  websiteData.thumbnail_url = thumbnailUrl;

  // Insert website
  const { data: website, error: websiteError } = await supabase
    .from('websites')
    .insert([websiteData])
    .select()
    .single();

  if (websiteError) {
    // Clean up uploaded thumbnail if website creation fails
    await deleteImage(thumbnailUrl);
    throw new Error(`Failed to create website: ${websiteError.message}`);
  }

  // Upload gallery images if provided
  if (files && files.gallery && files.gallery.length > 0) {
    const galleryImages = [];

    for (let i = 0; i < files.gallery.length; i++) {
      const imageUrl = await uploadImage(files.gallery[i], 'websites/gallery');
      galleryImages.push({
        website_id: website.id,
        image_url: imageUrl,
        display_order: i
      });
    }

    const { error: galleryError } = await supabase
      .from('website_images')
      .insert(galleryImages);

    if (galleryError) {
      console.error('Gallery images insert error:', galleryError);
    }
  }

  return await this.getWebsiteById(website.id);
};

// Update website
exports.updateWebsite = async (id, websiteData, files) => {
  // Check if website exists
  const existingWebsite = await this.getWebsiteById(id);
  if (!existingWebsite) {
    throw new Error('Website not found');
  }

  // Upload new thumbnail if provided
  if (files && files.thumbnail && files.thumbnail.length > 0) {
    const newThumbnailUrl = await uploadImage(files.thumbnail[0], 'websites/thumbnails');
    
    // Delete old thumbnail
    if (existingWebsite.thumbnail_url) {
      await deleteImage(existingWebsite.thumbnail_url);
    }
    
    websiteData.thumbnail_url = newThumbnailUrl;
  }

  // Update website
  const { data: updatedWebsite, error: updateError } = await supabase
    .from('websites')
    .update(websiteData)
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    throw new Error(`Failed to update website: ${updateError.message}`);
  }

  // Upload new gallery images if provided
  if (files && files.gallery && files.gallery.length > 0) {
    // Get current max display_order
    const { data: existingImages } = await supabase
      .from('website_images')
      .select('display_order')
      .eq('website_id', id)
      .order('display_order', { ascending: false })
      .limit(1);

    const startOrder = existingImages && existingImages.length > 0 
      ? existingImages[0].display_order + 1 
      : 0;

    const galleryImages = [];

    for (let i = 0; i < files.gallery.length; i++) {
      const imageUrl = await uploadImage(files.gallery[i], 'websites/gallery');
      galleryImages.push({
        website_id: id,
        image_url: imageUrl,
        display_order: startOrder + i
      });
    }

    await supabase
      .from('website_images')
      .insert(galleryImages);
  }

  return await this.getWebsiteById(id);
};

// Delete website
exports.deleteWebsite = async (id) => {
  // Get website with images
  const website = await this.getWebsiteById(id);
  
  if (!website) {
    throw new Error('Website not found');
  }

  // Delete thumbnail
  if (website.thumbnail_url) {
    await deleteImage(website.thumbnail_url);
  }

  // Delete gallery images
  if (website.website_images && website.website_images.length > 0) {
    for (const image of website.website_images) {
      await deleteImage(image.image_url);
    }
  }

  // Delete website (CASCADE will delete website_images records)
  const { error } = await supabase
    .from('websites')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete website: ${error.message}`);
  }
};

// Delete gallery image
exports.deleteGalleryImage = async (websiteId, imageId) => {
  // Get image
  const { data: image, error: fetchError } = await supabase
    .from('website_images')
    .select('*')
    .eq('id', imageId)
    .eq('website_id', websiteId)
    .single();

  if (fetchError || !image) {
    throw new Error('Gallery image not found');
  }

  // Delete from storage
  await deleteImage(image.image_url);

  // Delete from database
  const { error: deleteError } = await supabase
    .from('website_images')
    .delete()
    .eq('id', imageId);

  if (deleteError) {
    throw new Error(`Failed to delete gallery image: ${deleteError.message}`);
  }
};
