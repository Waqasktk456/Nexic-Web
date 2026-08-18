// =============================================
// NexicWeb Admin Dashboard - Vanilla JavaScript
// =============================================

// Configuration
const API_BASE_URL = 'https://nexic-web.onrender.com/api'; // Render production URL

// State
let websites = [];
let filteredWebsites = [];
let currentWebsite = null;
let thumbnailFile = null;
let previewImageFile = null;
let galleryFiles = [];
let deleteWebsiteId = null;
let users = [];
let filteredUsers = [];
let changeRoleUserId = null;
let changeRoleNewRole = null;
let deleteUserId = null;
let teamMembers = [];
let currentTeamMember = null;
let memberPhotoFile = null;
let deleteTeamMemberId = null;

// Authentication Check
function checkAuth() {
  const user = localStorage.getItem('nexicweb_user');
  
  if (!user) {
    alert('Please login first through the main website');
    window.location.href = 'index.html';
    return false;
  }
  
  try {
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      window.location.href = 'index.html';
      return false;
    }
    return true;
  } catch {
    window.location.href = 'index.html';
    return false;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (!checkAuth()) return;
  
  initializeEventListeners();
  loadDashboardData();
});

// Event Listeners
function initializeEventListeners() {
  // Navigation
  document.getElementById('menuBtn').addEventListener('click', toggleSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', toggleSidebar);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  
  // Menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
  });
  
  // Websites page
  document.getElementById('addWebsiteBtn').addEventListener('click', () => showWebsiteForm());
  document.getElementById('searchInput').addEventListener('input', filterWebsites);
  document.getElementById('categoryFilter').addEventListener('change', filterWebsites);
  document.getElementById('statusFilter').addEventListener('change', filterWebsites);
  
  // Admins page
  document.getElementById('userSearchInput').addEventListener('input', filterUsers);
  document.getElementById('roleFilter').addEventListener('change', filterUsers);
  
  // Team page
  document.getElementById('addTeamBtn').addEventListener('click', () => showTeamForm());
  document.getElementById('backTeamBtn').addEventListener('click', () => navigateTo('team'));
  document.getElementById('cancelTeamBtn').addEventListener('click', () => navigateTo('team'));
  document.getElementById('teamForm').addEventListener('submit', handleTeamFormSubmit);
  // Member photo upload (if exists)
  const memberPhotoInput = document.getElementById('memberPhotoInput');
  if (memberPhotoInput) {
    memberPhotoInput.addEventListener('change', handleMemberPhotoChange);
  }
  
  // Form buttons (if exist)
  const backBtn = document.getElementById('backBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const websiteForm = document.getElementById('websiteForm');
  
  if (backBtn) backBtn.addEventListener('click', () => navigateTo('websites'));
  if (cancelBtn) cancelBtn.addEventListener('click', () => navigateTo('websites'));
  if (websiteForm) websiteForm.addEventListener('submit', handleFormSubmit);
  
  // File uploads (if exist)
  const thumbnailInput = document.getElementById('thumbnailInput');
  const previewImageInput = document.getElementById('previewImageInput');
  const galleryInput = document.getElementById('galleryInput');
  
  if (thumbnailInput) thumbnailInput.addEventListener('change', handleThumbnailChange);
  if (previewImageInput) previewImageInput.addEventListener('change', handlePreviewImageChange);
  if (galleryInput) galleryInput.addEventListener('change', handleGalleryChange);
  
  // Delete modal (if exists)
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  
  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', hideDeleteModal);
  if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', confirmDelete);
  
  // Role change modal (if exists)
  const cancelRoleBtn = document.getElementById('cancelRoleBtn');
  const confirmRoleBtn = document.getElementById('confirmRoleBtn');
  
  if (cancelRoleBtn) cancelRoleBtn.addEventListener('click', hideRoleModal);
  if (confirmRoleBtn) confirmRoleBtn.addEventListener('click', confirmRoleChange);
  
  // Delete user modal (if exists)
  const cancelDeleteUserBtn = document.getElementById('cancelDeleteUserBtn');
  const confirmDeleteUserBtn = document.getElementById('confirmDeleteUserBtn');
  
  if (cancelDeleteUserBtn) cancelDeleteUserBtn.addEventListener('click', hideDeleteUserModal);
  if (confirmDeleteUserBtn) confirmDeleteUserBtn.addEventListener('click', confirmDeleteUser);
  
  // Delete team member modal
  document.getElementById('cancelDeleteTeamBtn').addEventListener('click', hideDeleteTeamModal);
  document.getElementById('confirmDeleteTeamBtn').addEventListener('click', confirmDeleteTeam);
}

// Navigation
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}

function navigateTo(page) {
  // Update menu active state
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  
  // Update page
  document.querySelectorAll('.page').forEach(p => {
    p.classList.toggle('active', p.id === `${page}Page`);
  });
  
  // Close sidebar on mobile
  if (window.innerWidth <= 1024) {
    toggleSidebar();
  }
  
  // Load data
  if (page === 'dashboard') {
    loadDashboardData();
  } else if (page === 'websites') {
    loadWebsites();
  } else if (page === 'admins') {
    loadUsers();
  } else if (page === 'team') {
    loadTeamMembers();
  }
}

// Logout
function handleLogout() {
  localStorage.removeItem('nexicweb_user');
  showToast('Logged out successfully', 'success');
  window.location.href = 'index.html';
}

// Dashboard
async function loadDashboardData() {
  try {
    const response = await fetch(`${API_BASE_URL}/websites`);
    const data = await response.json();
    
    if (data.success) {
      websites = data.data;
      updateDashboardStats();
      displayRecentWebsites();
    }
  } catch (error) {
    console.error('Load dashboard error:', error);
    showToast('Failed to load dashboard data', 'error');
  }
}

function updateDashboardStats() {
  const total = websites.length;
  const featured = websites.filter(w => w.featured).length;
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recent = websites.filter(w => new Date(w.created_at) > sevenDaysAgo).length;
  
  document.getElementById('totalWebsites').textContent = total;
  document.getElementById('featuredWebsites').textContent = featured;
  document.getElementById('recentWebsites').textContent = recent;
}

function displayRecentWebsites() {
  const container = document.getElementById('recentList');
  const recentWebsites = websites.slice(0, 5);
  
  if (recentWebsites.length === 0) {
    container.innerHTML = '<div class="loading">No websites uploaded yet</div>';
    return;
  }
  
  container.innerHTML = recentWebsites.map(website => `
    <div class="recent-item">
      <img src="${website.thumbnail_url}" alt="${website.title}" class="recent-thumbnail" 
           onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'">
      <div class="recent-content">
        <div class="recent-title">${website.title}</div>
        <div class="recent-meta">
          <span class="badge badge-info">${website.category}</span>
          <span>$${website.price}</span>
          ${website.featured ? '<span class="badge badge-warning">Featured</span>' : ''}
        </div>
      </div>
      <span class="badge ${website.status === 'published' ? 'badge-success' : 'badge-warning'}">
        ${website.status}
      </span>
    </div>
  `).join('');
}

// Websites
async function loadWebsites() {
  try {
    document.getElementById('websitesGrid').innerHTML = '<div class="loading">Loading websites...</div>';
    
    const response = await fetch(`${API_BASE_URL}/websites`);
    const data = await response.json();
    
    if (data.success) {
      websites = data.data;
      filteredWebsites = websites;
      displayWebsites();
    }
  } catch (error) {
    console.error('Load websites error:', error);
    showToast('Failed to load websites', 'error');
  }
}

function filterWebsites() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const status = document.getElementById('statusFilter').value;
  
  filteredWebsites = websites.filter(website => {
    const matchSearch = !search || 
      website.title.toLowerCase().includes(search) || 
      website.description.toLowerCase().includes(search);
    
    const matchCategory = category === 'all' || website.category === category;
    const matchStatus = status === 'all' || website.status === status;
    
    return matchSearch && matchCategory && matchStatus;
  });
  
  displayWebsites();
}

function displayWebsites() {
  const container = document.getElementById('websitesGrid');
  
  if (filteredWebsites.length === 0) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <p style="color: var(--text3); margin-bottom: 1rem;">No websites found</p>
        <button class="btn btn-primary" onclick="showWebsiteForm()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Your First Website
        </button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredWebsites.map(website => `
    <div class="website-card">
      <div class="website-thumbnail">
        <img src="${website.thumbnail_url}" alt="${website.title}"
             onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
        ${website.featured ? '<span class="featured-badge">Featured</span>' : ''}
      </div>
      <h3 class="website-title">${website.title}</h3>
      <p class="website-description">${website.description}</p>
      <div class="website-meta">
        <span class="badge badge-info">${website.category}</span>
        <span class="badge ${website.status === 'published' ? 'badge-success' : 'badge-warning'}">
          ${website.status}
        </span>
        <span class="website-price">$${website.price}</span>
      </div>
      <div class="website-actions">
        ${website.demo_url ? `
          <a href="${website.demo_url}" target="_blank" class="btn btn-secondary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Demo
          </a>
        ` : ''}
        <button class="btn btn-secondary btn-sm" onclick="editWebsite('${website.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="btn btn-danger btn-sm" onclick="showDeleteModal('${website.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

// Form
function showWebsiteForm(websiteId = null) {
  navigateTo('websiteForm');
  currentWebsite = websiteId ? websites.find(w => w.id === websiteId) : null;
  thumbnailFile = null;
  previewImageFile = null;
  galleryFiles = [];
  
  if (currentWebsite) {
    document.getElementById('formTitle').textContent = 'Edit Website';
    document.getElementById('formSubtitle').textContent = 'Update website details';
    document.getElementById('submitBtnText').textContent = 'Update Website';
    fillForm(currentWebsite);
  } else {
    document.getElementById('formTitle').textContent = 'Add New Website';
    document.getElementById('formSubtitle').textContent = 'Create a new website template';
    document.getElementById('submitBtnText').textContent = 'Create Website';
    resetForm();
  }
}

function editWebsite(id) {
  showWebsiteForm(id);
}

function fillForm(website) {
  document.getElementById('websiteId').value = website.id;
  document.getElementById('titleInput').value = website.title;
  document.getElementById('descriptionInput').value = website.description;
  document.getElementById('categoryInput').value = website.category;
  document.getElementById('priceInput').value = website.price;
  document.getElementById('demoUrlInput').value = website.demo_url || '';
  document.getElementById('githubUrlInput').value = website.github_url || '';
  document.getElementById('detailsPageInput').value = website.details_page || '';
  document.getElementById('displayOrderInput').value = website.display_order || 999;
  document.getElementById('featuredInput').checked = website.featured;
  document.getElementById('statusInput').value = website.status;
  
  // Detail page fields
  document.getElementById('livePreviewUrlInput').value = website.live_preview_url || '';
  document.getElementById('categoryTagInput').value = website.category_tag || '';
  document.getElementById('subtitleInput').value = website.subtitle || '';
  document.getElementById('featureTagsInput').value = website.feature_tags ? website.feature_tags.join(', ') : '';
  document.getElementById('longDescriptionInput').value = website.long_description || '';
  document.getElementById('ratingInput').value = website.rating || '';
  document.getElementById('licenseInput').value = website.license || '';
  document.getElementById('updatesInput').value = website.updates || '';
  document.getElementById('featurePillsInput').value = website.feature_pills ? website.feature_pills.join(', ') : '';
  
  // Packages
  if (website.packages) {
    const pkg = website.packages;
    
    // Starter package
    document.getElementById('starterPriceInput').value = pkg.starter?.price || '';
    document.getElementById('starterFeaturesInput').value = pkg.starter?.features ? pkg.starter.features.join('\n') : '';
    
    // Professional package
    document.getElementById('professionalPriceInput').value = pkg.professional?.price || '';
    document.getElementById('professionalFeaturesInput').value = pkg.professional?.features ? pkg.professional.features.join('\n') : '';
    
    // Agency package
    document.getElementById('agencyPriceInput').value = pkg.agency?.price || '';
    document.getElementById('agencyFeaturesInput').value = pkg.agency?.features ? pkg.agency.features.join('\n') : '';
  }
  
  // Resource cards
  if (website.resource_cards && website.resource_cards.length > 0) {
    const cards = website.resource_cards;
    document.getElementById('resource1TitleInput').value = cards[0]?.title || '';
    document.getElementById('resource1DescInput').value = cards[0]?.description || '';
    document.getElementById('resource1LinkInput').value = cards[0]?.link || '';
    document.getElementById('resource1IconInput').value = cards[0]?.icon || '';
    
    document.getElementById('resource2TitleInput').value = cards[1]?.title || '';
    document.getElementById('resource2DescInput').value = cards[1]?.description || '';
    document.getElementById('resource2LinkInput').value = cards[1]?.link || '';
    document.getElementById('resource2IconInput').value = cards[1]?.icon || '';
    
    document.getElementById('resource3TitleInput').value = cards[2]?.title || '';
    document.getElementById('resource3DescInput').value = cards[2]?.description || '';
    document.getElementById('resource3LinkInput').value = cards[2]?.link || '';
    document.getElementById('resource3IconInput').value = cards[2]?.icon || '';
    
    document.getElementById('resource4TitleInput').value = cards[3]?.title || '';
    document.getElementById('resource4DescInput').value = cards[3]?.description || '';
    document.getElementById('resource4LinkInput').value = cards[3]?.link || '';
    document.getElementById('resource4IconInput').value = cards[3]?.icon || '';
  }
  
  // Show existing thumbnail
  const thumbnailPreview = document.getElementById('thumbnailPreview');
  thumbnailPreview.innerHTML = `
    <div class="preview-item">
      <img src="${website.thumbnail_url}" alt="Thumbnail">
    </div>
  `;
  document.getElementById('thumbnailBtnText').textContent = 'Change Thumbnail';
  
  // Show existing preview image
  if (website.preview_image_url) {
    const previewImagePreview = document.getElementById('previewImagePreview');
    previewImagePreview.innerHTML = `
      <div class="preview-item">
        <img src="${website.preview_image_url}" alt="Preview Image">
      </div>
    `;
    document.getElementById('previewImageBtnText').textContent = 'Change Preview Image';
  }
  
  // Show existing gallery
  if (website.website_images && website.website_images.length > 0) {
    const galleryPreview = document.getElementById('existingGalleryPreview');
    galleryPreview.innerHTML = website.website_images.map(img => `
      <div class="preview-item">
        <img src="${img.image_url}" alt="Gallery">
        <button type="button" class="remove-preview" onclick="deleteGalleryImage('${website.id}', '${img.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');
  }
}

function resetForm() {
  const websiteForm = document.getElementById('websiteForm');
  const websiteId = document.getElementById('websiteId');
  const thumbnailPreview = document.getElementById('thumbnailPreview');
  const previewImagePreview = document.getElementById('previewImagePreview');
  const existingGalleryPreview = document.getElementById('existingGalleryPreview');
  const galleryPreview = document.getElementById('galleryPreview');
  const thumbnailBtnText = document.getElementById('thumbnailBtnText');
  const previewImageBtnText = document.getElementById('previewImageBtnText');
  
  if (websiteForm) websiteForm.reset();
  if (websiteId) websiteId.value = '';
  if (thumbnailPreview) thumbnailPreview.innerHTML = '';
  if (previewImagePreview) previewImagePreview.innerHTML = '';
  if (existingGalleryPreview) existingGalleryPreview.innerHTML = '';
  if (galleryPreview) galleryPreview.innerHTML = '';
  if (thumbnailBtnText) thumbnailBtnText.textContent = 'Upload Thumbnail';
  if (previewImageBtnText) previewImageBtnText.textContent = 'Upload Preview Image';
  
  // Reset file variables
  thumbnailFile = null;
  previewImageFile = null;
  galleryFiles = [];
}

function handleThumbnailChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    showToast('Image size should be less than 5MB', 'error');
    e.target.value = '';
    return;
  }
  
  thumbnailFile = file;
  
  const preview = document.getElementById('thumbnailPreview');
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.innerHTML = `
      <div class="preview-item">
        <img src="${e.target.result}" alt="Thumbnail preview">
      </div>
    `;
  };
  reader.readAsDataURL(file);
  
  document.getElementById('thumbnailBtnText').textContent = 'Change Thumbnail';
}

function handlePreviewImageChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    showToast('Image size should be less than 5MB', 'error');
    e.target.value = '';
    return;
  }
  
  previewImageFile = file;
  
  const preview = document.getElementById('previewImagePreview');
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.innerHTML = `
      <div class="preview-item">
        <img src="${e.target.result}" alt="Preview image">
      </div>
    `;
  };
  reader.readAsDataURL(file);
  
  document.getElementById('previewImageBtnText').textContent = 'Change Preview Image';
}

function handleGalleryChange(e) {
  const files = Array.from(e.target.files);
  
  if (files.length > 10) {
    showToast('Maximum 10 images allowed', 'error');
    e.target.value = '';
    return;
  }
  
  const validFiles = files.filter(file => {
    if (file.size > 5 * 1024 * 1024) {
      showToast(`${file.name} is too large. Max 5MB per image.`, 'error');
      return false;
    }
    return true;
  });
  
  galleryFiles = validFiles;
  
  const preview = document.getElementById('galleryPreview');
  preview.innerHTML = '';
  
  validFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const div = document.createElement('div');
      div.className = 'preview-item';
      div.innerHTML = `
        <img src="${e.target.result}" alt="Gallery ${index + 1}">
        <button type="button" class="remove-preview" onclick="removeGalleryPreview(${index})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      `;
      preview.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

function removeGalleryPreview(index) {
  galleryFiles.splice(index, 1);
  document.getElementById('galleryInput').value = '';
  
  // Re-render previews
  const preview = document.getElementById('galleryPreview');
  preview.innerHTML = '';
  
  galleryFiles.forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const div = document.createElement('div');
      div.className = 'preview-item';
      div.innerHTML = `
        <img src="${e.target.result}" alt="Gallery ${i + 1}">
        <button type="button" class="remove-preview" onclick="removeGalleryPreview(${i})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      `;
      preview.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

async function deleteGalleryImage(websiteId, imageId) {
  if (!confirm('Delete this gallery image?')) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/websites/${websiteId}/images/${imageId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Image deleted successfully', 'success');
      // Reload the website to get updated gallery
      const websiteResponse = await fetch(`${API_BASE_URL}/websites/${websiteId}`);
      const websiteData = await websiteResponse.json();
      if (websiteData.success) {
        currentWebsite = websiteData.data;
        fillForm(currentWebsite);
      }
    } else {
      showToast(data.message || 'Failed to delete image', 'error');
    }
  } catch (error) {
    console.error('Delete image error:', error);
    showToast('Failed to delete image', 'error');
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const websiteIdEl = document.getElementById('websiteId');
  const isEdit = websiteIdEl && !!websiteIdEl.value;
  
  if (!isEdit && !thumbnailFile) {
    showToast('Please upload a thumbnail image', 'error');
    return;
  }
  
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  
  if (!submitBtn || !submitBtnText) {
    console.error('Submit button elements not found');
    return;
  }
  
  const originalText = submitBtnText.textContent;
  
  submitBtn.disabled = true;
  submitBtnText.textContent = isEdit ? 'Updating...' : 'Creating...';
  
  try {
    const formData = new FormData();
    
    // Helper function to safely get element value
    const getValue = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : '';
    };
    
    // Basic fields - only add if elements exist
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const categoryInput = document.getElementById('categoryInput');
    
    if (!titleInput || !descriptionInput || !categoryInput) {
      showToast('Required form fields are missing', 'error');
      submitBtn.disabled = false;
      submitBtnText.textContent = originalText;
      return;
    }
    
    formData.append('title', titleInput.value);
    formData.append('description', descriptionInput.value);
    formData.append('category', categoryInput.value);
    formData.append('price', getValue('priceInput'));
    formData.append('demo_url', getValue('demoUrlInput'));
    formData.append('github_url', getValue('githubUrlInput'));
    formData.append('details_page', getValue('detailsPageInput'));
    formData.append('display_order', getValue('displayOrderInput'));
    
    const featuredInput = document.getElementById('featuredInput');
    const statusInput = document.getElementById('statusInput');
    
    if (featuredInput) formData.append('featured', featuredInput.checked);
    if (statusInput) formData.append('status', statusInput.value);
    
    // Detail page content fields - all optional
    formData.append('live_preview_url', getValue('livePreviewUrlInput'));
    formData.append('category_tag', getValue('categoryTagInput'));
    formData.append('subtitle', getValue('subtitleInput'));
    formData.append('long_description', getValue('longDescriptionInput'));
    formData.append('rating', getValue('ratingInput'));
    formData.append('license', getValue('licenseInput'));
    formData.append('updates', getValue('updatesInput'));
    
    // Feature tags (comma-separated string to array)
    const featureTagsInput = document.getElementById('featureTagsInput');
    if (featureTagsInput && featureTagsInput.value) {
      formData.append('feature_tags', JSON.stringify(featureTagsInput.value.split(',').map(t => t.trim()).filter(t => t)));
    }
    
    // Feature pills (comma-separated string to array)
    const featurePillsInput = document.getElementById('featurePillsInput');
    if (featurePillsInput && featurePillsInput.value) {
      formData.append('feature_pills', JSON.stringify(featurePillsInput.value.split(',').map(t => t.trim()).filter(t => t)));
    }
    
    // Packages - only if elements exist
    const starterPriceInput = document.getElementById('starterPriceInput');
    const starterFeaturesInput = document.getElementById('starterFeaturesInput');
    const professionalPriceInput = document.getElementById('professionalPriceInput');
    const professionalFeaturesInput = document.getElementById('professionalFeaturesInput');
    const agencyPriceInput = document.getElementById('agencyPriceInput');
    const agencyFeaturesInput = document.getElementById('agencyFeaturesInput');
    
    if (starterPriceInput || professionalPriceInput || agencyPriceInput) {
      const packages = {
        starter: {
          price: starterPriceInput ? starterPriceInput.value || null : null,
          features: starterFeaturesInput && starterFeaturesInput.value
            ? starterFeaturesInput.value.split('\n').map(f => f.trim()).filter(f => f)
            : []
        },
        professional: {
          price: professionalPriceInput ? professionalPriceInput.value || null : null,
          features: professionalFeaturesInput && professionalFeaturesInput.value
            ? professionalFeaturesInput.value.split('\n').map(f => f.trim()).filter(f => f)
            : []
        },
        agency: {
          price: agencyPriceInput ? agencyPriceInput.value || null : null,
          features: agencyFeaturesInput && agencyFeaturesInput.value
            ? agencyFeaturesInput.value.split('\n').map(f => f.trim()).filter(f => f)
            : []
        }
      };
      formData.append('packages', JSON.stringify(packages));
    }
    
    // Resource cards
    const resourceCards = [];
    for (let i = 1; i <= 4; i++) {
      const title = document.getElementById(`resource${i}TitleInput`).value;
      const description = document.getElementById(`resource${i}DescInput`).value;
      const link = document.getElementById(`resource${i}LinkInput`).value;
      const icon = document.getElementById(`resource${i}IconInput`).value;
      
      if (title || description || link) {
        resourceCards.push({ title, description, link, icon: icon || 'fa-link' });
      }
    }
    if (resourceCards.length > 0) {
      formData.append('resource_cards', JSON.stringify(resourceCards));
    }
    
    // Images
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }
    
    if (previewImageFile) {
      formData.append('preview_image', previewImageFile);
    }
    
    galleryFiles.forEach(file => {
      formData.append('gallery', file);
    });
    
    const url = isEdit 
      ? `${API_BASE_URL}/websites/${document.getElementById('websiteId').value}`
      : `${API_BASE_URL}/websites`;
    
    const response = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast(data.message, 'success');
      navigateTo('websites');
      loadWebsites();
    } else {
      showToast(data.message || 'Failed to save website', 'error');
    }
  } catch (error) {
    console.error('Form submit error:', error);
    showToast('Failed to save website', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtnText.textContent = originalText;
  }
}

// Delete
function showDeleteModal(id) {
  deleteWebsiteId = id;
  document.getElementById('deleteModal').classList.add('active');
}

function hideDeleteModal() {
  deleteWebsiteId = null;
  document.getElementById('deleteModal').classList.remove('active');
}

async function confirmDelete() {
  if (!deleteWebsiteId) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/websites/${deleteWebsiteId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Website deleted successfully', 'success');
      hideDeleteModal();
      loadWebsites();
    } else {
      showToast(data.message || 'Failed to delete website', 'error');
    }
  } catch (error) {
    console.error('Delete error:', error);
    showToast('Failed to delete website', 'error');
  }
}

// ============================================================
// ADMINS MANAGEMENT
// ============================================================

async function loadUsers() {
  try {
    document.getElementById('usersTableBody').innerHTML = '<tr><td colspan="6" class="loading">Loading users...</td></tr>';
    
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();
    
    if (data.success) {
      users = data.data;
      filteredUsers = users;
      displayUsers();
    }
  } catch (error) {
    console.error('Load users error:', error);
    showToast('Failed to load users', 'error');
  }
}

function filterUsers() {
  const search = document.getElementById('userSearchInput').value.toLowerCase();
  const role = document.getElementById('roleFilter').value;
  
  filteredUsers = users.filter(user => {
    const matchSearch = !search || 
      user.name.toLowerCase().includes(search) || 
      user.email.toLowerCase().includes(search);
    
    const matchRole = role === 'all' || user.role === role;
    
    return matchSearch && matchRole;
  });
  
  displayUsers();
}

function displayUsers() {
  const tbody = document.getElementById('usersTableBody');
  
  if (filteredUsers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">No users found</td></tr>';
    return;
  }
  
  tbody.innerHTML = filteredUsers.map(user => {
    const date = new Date(user.created_at).toLocaleDateString();
    
    return `
      <tr>
        <td>
          <div class="user-info">
            <span class="user-name-text">${user.name}</span>
          </div>
        </td>
        <td>
          <span class="user-email">${user.email}</span>
        </td>
        <td>
          <select class="role-selector" onchange="handleRoleChange('${user.id}', this.value)" data-original="${user.role}">
            <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
          </select>
        </td>
        <td>
          <span class="badge ${user.is_verified ? 'badge-success' : 'badge-warning'}">
            ${user.is_verified ? 'Verified' : 'Pending'}
          </span>
        </td>
        <td>${date}</td>
        <td>
          <div class="table-actions">
            <button class="icon-btn danger" onclick="showDeleteUserModal('${user.id}')" title="Delete user">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleRoleChange(userId, newRole) {
  const user = users.find(u => u.id === userId);
  if (!user) return;
  
  if (user.role === newRole) return;
  
  changeRoleUserId = userId;
  changeRoleNewRole = newRole;
  
  const roleModalText = document.getElementById('roleModalText');
  const roleModal = document.getElementById('roleModal');
  
  if (roleModalText) {
    roleModalText.textContent = `Change ${user.name}'s role from "${user.role}" to "${newRole}"?`;
  }
  
  if (roleModal) {
    roleModal.classList.add('active');
  }
}

function hideRoleModal() {
  changeRoleUserId = null;
  changeRoleNewRole = null;
  
  const roleModal = document.getElementById('roleModal');
  if (roleModal) {
    roleModal.classList.remove('active');
  }
  
  // Reset selectors to original value
  const roleSelectors = document.querySelectorAll('.role-selector');
  roleSelectors.forEach(select => {
    const userId = select.dataset.userId;
    const user = users.find(u => u.id === userId);
    if (user) {
      select.value = user.role;
    }
  });
}

async function confirmRoleChange() {
  if (!changeRoleUserId || !changeRoleNewRole) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/${changeRoleUserId}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: changeRoleNewRole })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('User role updated successfully', 'success');
      hideRoleModal();
      loadUsers();
    } else {
      showToast(data.message || 'Failed to update role', 'error');
      hideRoleModal();
    }
  } catch (error) {
    console.error('Update role error:', error);
    showToast('Failed to update role', 'error');
    hideRoleModal();
  }
}

function showDeleteUserModal(id) {
  deleteUserId = id;
  document.getElementById('deleteUserModal').classList.add('active');
}

function hideDeleteUserModal() {
  deleteUserId = null;
  document.getElementById('deleteUserModal').classList.remove('active');
}

async function confirmDeleteUser() {
  if (!deleteUserId) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/${deleteUserId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('User deleted successfully', 'success');
      hideDeleteUserModal();
      loadUsers();
    } else {
      showToast(data.message || 'Failed to delete user', 'error');
    }
  } catch (error) {
    console.error('Delete user error:', error);
    showToast('Failed to delete user', 'error');
  }
}

// ============================================================
// TEAM MANAGEMENT
// ============================================================

async function loadTeamMembers() {
  try {
    document.getElementById('teamGrid').innerHTML = '<div class="loading">Loading team members...</div>';
    
    const response = await fetch(`${API_BASE_URL}/team`);
    const data = await response.json();
    
    if (data.success) {
      teamMembers = data.data;
      displayTeamMembers();
    }
  } catch (error) {
    console.error('Load team members error:', error);
    showToast('Failed to load team members', 'error');
  }
}

function displayTeamMembers() {
  const container = document.getElementById('teamGrid');
  
  if (teamMembers.length === 0) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <p style="color: var(--text3); margin-bottom: 1rem;">No team members added yet</p>
        <button class="btn btn-primary" onclick="showTeamForm()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add First Team Member
        </button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = teamMembers.map(member => `
    <div class="website-card">
      <div class="website-thumbnail">
        <img src="${member.image_url}" alt="${member.name}"
             onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
      </div>
      <h3 class="website-title">${member.name}</h3>
      <p class="website-description">${member.role}</p>
      <div class="website-meta">
        ${member.portfolio_url ? `<span class="badge badge-info">Has Portfolio</span>` : ''}
        <span class="badge badge-warning">Order: ${member.display_order}</span>
      </div>
      <div class="website-actions">
        ${member.portfolio_url ? `
          <a href="${member.portfolio_url}" target="_blank" class="btn btn-secondary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Portfolio
          </a>
        ` : ''}
        <button class="btn btn-secondary btn-sm" onclick="editTeamMember('${member.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="btn btn-danger btn-sm" onclick="showDeleteTeamModal('${member.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

function showTeamForm(memberId = null) {
  navigateTo('teamForm');
  currentTeamMember = memberId ? teamMembers.find(m => m.id === memberId) : null;
  memberPhotoFile = null;
  
  if (currentTeamMember) {
    document.getElementById('teamFormTitle').textContent = 'Edit Team Member';
    document.getElementById('teamFormSubtitle').textContent = 'Update team member details';
    document.getElementById('submitTeamBtnText').textContent = 'Update Member';
    fillTeamForm(currentTeamMember);
  } else {
    document.getElementById('teamFormTitle').textContent = 'Add Team Member';
    document.getElementById('teamFormSubtitle').textContent = 'Add a new team member';
    document.getElementById('submitTeamBtnText').textContent = 'Add Team Member';
    resetTeamForm();
  }
}

function editTeamMember(id) {
  showTeamForm(id);
}

function fillTeamForm(member) {
  document.getElementById('teamMemberId').value = member.id;
  document.getElementById('memberNameInput').value = member.name;
  document.getElementById('memberRoleInput').value = member.role;
  document.getElementById('memberPortfolioInput').value = member.portfolio_url || '';
  document.getElementById('memberOrderInput').value = member.display_order;
  
  const photoPreview = document.getElementById('memberPhotoPreview');
  photoPreview.innerHTML = `
    <div class="preview-item">
      <img src="${member.image_url}" alt="Member photo">
    </div>
  `;
  document.getElementById('memberPhotoBtnText').textContent = 'Change Photo';
}

function resetTeamForm() {
  document.getElementById('teamForm').reset();
  document.getElementById('teamMemberId').value = '';
  document.getElementById('memberPhotoPreview').innerHTML = '';
  document.getElementById('memberPhotoBtnText').textContent = 'Upload Photo';
}

function handleMemberPhotoChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    showToast('Image size should be less than 5MB', 'error');
    e.target.value = '';
    return;
  }
  
  memberPhotoFile = file;
  
  const preview = document.getElementById('memberPhotoPreview');
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.innerHTML = `
      <div class="preview-item">
        <img src="${e.target.result}" alt="Photo preview">
      </div>
    `;
  };
  reader.readAsDataURL(file);
  
  document.getElementById('memberPhotoBtnText').textContent = 'Change Photo';
}

async function handleTeamFormSubmit(e) {
  e.preventDefault();
  
  const isEdit = !!document.getElementById('teamMemberId').value;
  
  if (!isEdit && !memberPhotoFile) {
    showToast('Please upload a member photo', 'error');
    return;
  }
  
  const submitBtn = document.getElementById('submitTeamBtn');
  const submitBtnText = document.getElementById('submitTeamBtnText');
  const originalText = submitBtnText.textContent;
  
  submitBtn.disabled = true;
  submitBtnText.textContent = isEdit ? 'Updating...' : 'Adding...';
  
  try {
    const formData = new FormData();
    formData.append('name', document.getElementById('memberNameInput').value);
    formData.append('role', document.getElementById('memberRoleInput').value);
    formData.append('portfolio_url', document.getElementById('memberPortfolioInput').value);
    formData.append('display_order', document.getElementById('memberOrderInput').value);
    
    if (memberPhotoFile) {
      formData.append('image', memberPhotoFile);
    }
    
    const url = isEdit 
      ? `${API_BASE_URL}/team/${document.getElementById('teamMemberId').value}`
      : `${API_BASE_URL}/team`;
    
    const response = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast(data.message, 'success');
      navigateTo('team');
      loadTeamMembers();
    } else {
      showToast(data.message || 'Failed to save team member', 'error');
    }
  } catch (error) {
    console.error('Form submit error:', error);
    showToast('Failed to save team member', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtnText.textContent = originalText;
  }
}

function showDeleteTeamModal(id) {
  deleteTeamMemberId = id;
  document.getElementById('deleteTeamModal').classList.add('active');
}

function hideDeleteTeamModal() {
  deleteTeamMemberId = null;
  document.getElementById('deleteTeamModal').classList.remove('active');
}

async function confirmDeleteTeam() {
  if (!deleteTeamMemberId) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/team/${deleteTeamMemberId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Team member deleted successfully', 'success');
      hideDeleteTeamModal();
      loadTeamMembers();
    } else {
      showToast(data.message || 'Failed to delete team member', 'error');
    }
  } catch (error) {
    console.error('Delete team member error:', error);
    showToast('Failed to delete team member', 'error');
  }
}

// Toast
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
