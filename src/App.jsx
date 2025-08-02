import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar එකට සහ Routes වලට container div එකක් අවශ්‍ය නෑ */}
        <Navbar />
        <main> {/* Content එකට semantic main tag එකක් පාවිච්චි කරමු */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;