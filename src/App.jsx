// src/App.jsx (සරල සහ නිවැරදි කරන ලද)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
// import SellerDashboard from './pages/SellerDashboard';
// import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {/* Public Routes වලට Navbar එකක් අවශ්‍ය නම්, ඒවාට වෙනම Layout එකක් හදන්න පුළුවන් */}
      {/* දැනට අපි හැම public page එකටම Navbar එක දාමු */}
      <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/login" element={<Login />} /> {/* Login/Register වලට Navbar එකක් ඕන නෑ */}
          <Route path="/register" element={<Register />} />
          
          {/* Protected Dashboard Routes */}
          <Route 
              path="/admin/*" 
              element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} 
          />
          {/* ... other dashboard routes ... */}

          <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;