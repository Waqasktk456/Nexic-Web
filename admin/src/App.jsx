import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WebsitesList from './pages/WebsitesList';
import WebsiteForm from './pages/WebsiteForm';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('nexicweb_user');
  
  if (!user) {
    // Redirect to main website - update this path to your actual index.html location
    alert('Please login first through the main website');
    window.location.href = 'file:///C:/Users/muham/Desktop/files/index.html';
    return null;
  }
  
  try {
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      // Not an admin, redirect to main website
      alert('Access denied. Admin privileges required.');
      window.location.href = 'file:///C:/Users/muham/Desktop/files/index.html';
      return null;
    }
  } catch {
    window.location.href = 'file:///C:/Users/muham/Desktop/files/index.html';
    return null;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111126',
            color: '#f0f0f8',
            border: '1px solid rgba(255,255,255,0.13)',
            borderRadius: '10px',
            padding: '16px',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#34d399',
              secondary: '#111126',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#111126',
            },
          },
        }}
      />
      
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="websites" element={<WebsitesList />} />
          <Route path="websites/new" element={<WebsiteForm />} />
          <Route path="websites/edit/:id" element={<WebsiteForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
