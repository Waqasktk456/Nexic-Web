import { useState, useEffect } from 'react';
import { Globe, Star, Clock } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    recent: 0,
  });
  const [recentWebsites, setRecentWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.websites);
      const websites = response.data.data;

      // Calculate stats
      const totalCount = websites.length;
      const featuredCount = websites.filter((w) => w.featured).length;
      
      // Recent uploads (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentCount = websites.filter((w) => new Date(w.created_at) > sevenDaysAgo).length;

      setStats({
        total: totalCount,
        featured: featuredCount,
        recent: recentCount,
      });

      // Get 5 most recent websites
      setRecentWebsites(websites.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Fetch dashboard data error:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="card card-hover">
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-nexic bg-${color}/10 text-${color}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-text3 text-sm">{label}</p>
          <p className="text-3xl font-bold text-text mt-1">{loading ? '...' : value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text mb-2">Dashboard</h1>
        <p className="text-text2">Welcome to NexicWeb Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Globe} label="Total Websites" value={stats.total} color="accent" />
        <StatCard icon={Star} label="Featured Websites" value={stats.featured} color="gold" />
        <StatCard icon={Clock} label="Recent Uploads" value={stats.recent} color="accent3" />
      </div>

      {/* Recent Websites */}
      <div className="card">
        <h2 className="text-xl font-display font-bold text-text mb-6">Recent Uploads</h2>
        
        {loading ? (
          <div className="text-center py-8 text-text3">Loading...</div>
        ) : recentWebsites.length === 0 ? (
          <div className="text-center py-8 text-text3">No websites uploaded yet</div>
        ) : (
          <div className="space-y-4">
            {recentWebsites.map((website) => (
              <div
                key={website.id}
                className="flex items-center gap-4 p-4 bg-surface rounded-nexic-sm hover:bg-surface2 transition-colors"
              >
                <img
                  src={website.thumbnail_url}
                  alt={website.title}
                  className="w-20 h-20 object-cover rounded-nexic-sm"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-text mb-1">{website.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-text3">
                    <span className="badge badge-info">{website.category}</span>
                    <span>${website.price}</span>
                    {website.featured && <span className="badge badge-warning">Featured</span>}
                  </div>
                </div>
                <div className="text-right text-sm text-text3">
                  <span className={`badge ${website.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                    {website.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
