import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Globe, LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Globe, label: 'Websites', path: '/websites' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem('nexicweb_user');
    toast.success('Logged out successfully');
    // Redirect to main website index.html
    window.location.href = 'file:///C:/Users/muham/Desktop/files/index.html';
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-bg2/80 backdrop-blur-xl border-b border-border z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-surface rounded-nexic-sm transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-display font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
              NexicWeb Admin
            </h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-text2 hover:text-text hover:bg-surface rounded-nexic-sm transition-all"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 pt-16 lg:pt-0
            w-64 bg-bg2 border-r border-border
            transform transition-transform duration-300 z-40
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-nexic-sm
                  font-medium transition-all duration-300
                  ${
                    isActive(item.path)
                      ? 'bg-accent text-white shadow-glow'
                      : 'text-text2 hover:text-text hover:bg-surface'
                  }
                `}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
