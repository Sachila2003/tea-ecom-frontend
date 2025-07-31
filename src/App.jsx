import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Layout/Navbar";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;