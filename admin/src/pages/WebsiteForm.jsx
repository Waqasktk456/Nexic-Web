import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import toast from 'react-hot-toast';

const WebsiteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'portfolio',
    price: '',
    demo_url: '',
    github_url: '',
    featured: false,
    status: 'draft',
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  useEffect(() => {
    if (isEdit) {
      fetchWebsite();
    }
  }, [id]);

  const fetchWebsite = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.websites}/${id}`);
      const website = response.data.data;
      
      setFormData({
        title: website.title,
        description: website.description,
        category: website.category,
        price: website.price.toString(),
        demo_url: website.demo_url || '',
        github_url: website.github_url || '',
        featured: website.featured,
        status: website.status,
      });

      setThumbnailPreview(website.thumbnail_url);
      setExistingGallery(website.website_images || []);
    } catch (error) {
      console.error('Fetch website error:', error);
      toast.error('Failed to load website');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 5MB per image.`);
        return false;
      }
      return true;
    });

    setGalleryImages(validFiles);
    setGalleryPreviews(validFiles.map((file) => URL.createObjectURL(file)));
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (imageId) => {
    try {
      await axios.delete(`${API_ENDPOINTS.websites}/${id}/images/${imageId}`);
      toast.success('Image deleted successfully');
      setExistingGallery((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error('Delete image error:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isEdit && !thumbnail) {
      toast.error('Please upload a thumbnail image');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      
      // Append form data
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Append thumbnail
      if (thumbnail) {
        submitData.append('thumbnail', thumbnail);
      }

      // Append gallery images
      galleryImages.forEach((file) => {
        submitData.append('gallery', file);
      });

      if (isEdit) {
        await axios.put(`${API_ENDPOINTS.websites}/${id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Website updated successfully');
      } else {
        await axios.post(API_ENDPOINTS.websites, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Website created successfully');
      }

      navigate('/websites');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || 'Failed to save website');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['portfolio', 'ecommerce', 'landing', 'agency', 'wordpress'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/websites')}
          className="flex items-center gap-2 text-text2 hover:text-text mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Websites
        </button>
        <h1 className="text-3xl font-display font-bold text-text mb-2">
          {isEdit ? 'Edit Website' : 'Add New Website'}
        </h1>
        <p className="text-text2">
          {isEdit ? 'Update website details' : 'Create a new website template'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="card">
          <h2 className="text-xl font-display font-bold text-text mb-6">Basic Information</h2>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-text2 text-sm font-medium mb-2">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input"
                placeholder="Modern Portfolio Template"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-text2 text-sm font-medium mb-2">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea"
                rows={4}
                placeholder="A beautiful and modern portfolio template with smooth animations..."
                required
              />
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text2 text-sm font-medium mb-2">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="select"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text2 text-sm font-medium mb-2">
                  Price ($) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="29.99"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Demo URL and GitHub URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text2 text-sm font-medium mb-2">Demo URL</label>
                <input
                  type="url"
                  name="demo_url"
                  value={formData.demo_url}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="https://demo.example.com"
                />
              </div>

              <div>
                <label className="block text-text2 text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            {/* Featured and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-border2 bg-surface text-accent focus:ring-accent focus:ring-offset-0"
                  />
                  <span className="text-text2 text-sm font-medium">Featured Website</span>
                </label>
              </div>

              <div>
                <label className="block text-text2 text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Images Card */}
        <div className="card">
          <h2 className="text-xl font-display font-bold text-text mb-6">Images</h2>

          {/* Thumbnail */}
          <div className="mb-6">
            <label className="block text-text2 text-sm font-medium mb-2">
              Thumbnail Image <span className="text-danger">*</span>
            </label>
            <p className="text-text3 text-sm mb-3">Upload a thumbnail image (max 5MB)</p>
            
            <div className="flex flex-col gap-4">
              {thumbnailPreview && (
                <div className="relative w-48 h-32 rounded-nexic-sm overflow-hidden border border-border">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <label className="btn btn-secondary w-fit cursor-pointer">
                <Upload size={18} />
                {thumbnailPreview ? 'Change Thumbnail' : 'Upload Thumbnail'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-text2 text-sm font-medium mb-2">Gallery Images</label>
            <p className="text-text3 text-sm mb-3">Upload up to 10 images (max 5MB each)</p>

            {/* Existing Gallery (Edit Mode) */}
            {isEdit && existingGallery.length > 0 && (
              <div className="mb-4">
                <p className="text-text3 text-sm mb-2">Existing Images</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingGallery.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.image_url}
                        alt="Gallery"
                        className="w-full h-32 object-cover rounded-nexic-sm border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteExistingImage(image.id)}
                        className="absolute top-2 right-2 p-1 bg-danger rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Gallery Images */}
            {galleryPreviews.length > 0 && (
              <div className="mb-4">
                <p className="text-text3 text-sm mb-2">New Images</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-nexic-sm border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 p-1 bg-danger rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label className="btn btn-secondary w-fit cursor-pointer">
              <Upload size={18} />
              Upload Gallery Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/websites')}
            className="btn btn-secondary flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                {isEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>{isEdit ? 'Update Website' : 'Create Website'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WebsiteForm;
