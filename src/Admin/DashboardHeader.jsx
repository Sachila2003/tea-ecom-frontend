//mek hdgtte dashboard header ekk hdnn
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { FiExternalLink } from 'react-icons/fi';
import './Admin.css';

const DashboardHeader = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        signOut();
        navigate("/login");
        handleClose();
    };

    return (
        <Box className="dashboard-header">
            <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: '600' }}>
                Admin Panel
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Link to="/" className="visit-site-link">
                    <FiExternalLink />
                    <span>Visit Site</span>
                </Link>

                {user && (
                    <>
                        <Typography sx={{ color: '#c5c5c5' }}>Hello, {user.name}</Typography>
                        <IconButton onClick={handleMenu} size="small">
                            <Avatar sx={{ width: 36, height: 36, bgcolor: '#00e599', color: '#121212' }}>
                                {user.name ? user.name[0].toUpperCase() : 'U'}
                            </Avatar>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default DashboardHeader;