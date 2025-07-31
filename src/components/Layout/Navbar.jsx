import React from 'react';
import { Link, useNavigate } from "react-router-dom";
// AuthContext එකෙන් user, loading, signOut ගන්නවා
import { useAuth } from '../../context/AuthContext';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Menu, MenuItem } from "@mui/material";

// අපේ අලුත් CSS file එක import කරනවා
import './Navbar.css'; 

// Logo එකේ import එකත් comment කරනවා, මොකද දැනට logo file එකක් නැති නිසා
// import logo from '../../assets/logo.png'; 

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
    }

    return (
        <AppBar position="static" className="full-width-navbar">
            <Toolbar className="navbar-toolbar-content">
                
                {/* වම් පැත්ත: Logo (Commented), Title සහ Links */}
                <Box className="nav-group-left">
                    
                    {/* --- LOGO එකට තියෙන කොටස මෙතන --- */}
                    {/* ඔයාට logo එකක් දාගන්න ඕන වුණාම මේ comment එක අයින් කරන්න */}
                    {/* 
                    <Link to="/" className="nav-logo-link">
                        <img src={logo} alt="Tea E-Com Logo" />
                    </Link>
                    */}
                    
                    <Typography variant="h6" className="navbar-title">
                        Tea E-Com
                    </Typography>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </Box>

                {/* දකුණු පැත්ත: Login/Register හෝ User Profile */}
                <Box className="nav-group-right">
                    {loading ? null : user ? (
                        <>
                            <Typography className="user-greeting">Hello, {user.name}</Typography>
                            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: '#58a6ff', width: 36, height: 36 }}>
                                    {user.name ? user.name[0].toUpperCase() : 'U'}
                                </Avatar>
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;