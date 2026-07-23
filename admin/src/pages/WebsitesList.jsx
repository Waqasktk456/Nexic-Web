import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import toast from 'react-hot-toast';

const WebsitesList = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);
  const [filteredWebsites, setFilteredWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchWebsites();
  }, []);

  useEffect(() => {
    filterWebsites();
  }, [searchTerm, categoryFilter, statusFilter, websites]);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.websites);
      setWebsites(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch websites error:', error);
      toast.error('Failed to load websites');
      setLoading(false);
    }
  };

  const filterWebsites = () => {
    let filtered = [...websites];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((w) => w.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((w) => w.status === statusFilter);
    }

    setFilteredWebsites(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.websites}/${id}`);
      toast.success('Website deleted successfully');
      setWebsites(websites.filter((w) => w.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Delete website error:', error);
      toast.error('Failed to delete website');
    }
  };

  const categories = ['all', 'portfolio', 'ecommerce', 'landing', 'agency', 'wordpress'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text mb-2">Websites</h1>
          <p className="text-text2">Manage your website templates</p>
        </div>
        <button
          onClick={() => navigate('/websites/new')}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Add Website
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text3" size={20} />
            <input
              type="text"
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select"
          >
            <option value="all">All Categories</option>
            {categories.filter((c) => c !== 'all').map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Websites Grid */}
      {loading ? (
        <div className="text-center py-12 text-text3">Loading websites...</div>
      ) : filteredWebsites.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text3 mb-4">No websites found</p>
          <button onClick={() => navigate('/websites/new')} className="btn btn-primary">
            <Plus size={20} />
            Add Your First Website
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => (
            <div key={website.id} className="card card-hover group">
              {/* Thumbnail */}
              <div className="relative overflow-hidden rounded-nexic-sm mb-4 aspect-video">
                <img
                  src={website.thumbnail_url}
                  alt={website.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                {website.featured && (
                  <div className="absolute top-2 right-2 badge badge-warning">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-text text-lg mb-1 line-clamp-1">
                    {website.title}
                  </h3>
                  <p className="text-text3 text-sm line-clamp-2">{website.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge badge-info">{website.category}</span>
                  <span className={`badge ${website.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                    {website.status}
                  </span>
                  <span className="text-accent font-semibold">${website.price}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  {website.demo_url && (
                    <a
                      href={website.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm flex-1"
                    >
                      <Eye size={16} />
                      Demo
                    </a>
                  )}
                  <button
                    onClick={() => navigate(`/websites/edit/${website.id}`)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(website.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-display font-bold text-text mb-4">Delete Website?</h3>
            <p className="text-text2 mb-6">
              Are you sure you want to delete this website? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn btn-danger flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitesList;
