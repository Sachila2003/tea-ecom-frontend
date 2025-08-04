// src/components/Layout/Navbar.jsx (සම්පූර්ණ, නිවැරදි කරන ලද code එක)

import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material";

import './Navbar.css'; 
import logoImage from '../../assets/images/tea-logo.png'; 

const Navbar = () => {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    
    const handleLogout = () => {
        handleClose();
        signOut();
        navigate("/login");
    };

    // Role එකට අනුව dashboard path එක තීරණය කරන function එක
    const getDashboardPath = () => {
        if (!user) return '/';
        if (user.role === 'admin') {
            return '/admin/dashboard';
        } else if (user.role === 'seller') {
            return '/seller/dashboard';
        } else {
            return '/dashboard';
        }
    };

    return (
        <header className="site-header dark-theme"> 
            <div className="navbar-content">
                <div className="navbar-section">
                    <Link to="/" className="navbar-logo-link">
                        <img src={logoImage} alt="Aura Tea Logo" className="navbar-logo-image" />
                    </Link>
                </div>

                <div className="navbar-section navbar-center-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </div>

                <div className="navbar-section navbar-right-actions">
                    {loading ? null : user ? (
                        <div className="user-profile-section">
                            <Typography className="user-greeting">Hello, {user.name}</Typography>
                            <IconButton onClick={handleMenu} size="small">
                                <Avatar sx={{ width: 36, height: 36, bgcolor: '#00e599', color: '#121212', fontWeight: 'bold' }}>
                                    {user.name ? user.name[0].toUpperCase() : 'U'}
                                </Avatar>
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} classes={{ paper: 'custom-menu' }}>
                                <MenuItem 
                                    className="custom-menu-item" 
                                    onClick={() => { 
                                        navigate(getDashboardPath()); 
                                        handleClose(); 
                                    }}
                                >
                                    Dashboard
                                </MenuItem>
                                <MenuItem className="custom-menu-item" onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link register-btn">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;