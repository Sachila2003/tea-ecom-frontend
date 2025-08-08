import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { FiExternalLink, FiLogOut, FiUser } from 'react-icons/fi';
import './Admin.css';

const DashboardHeader = ({ title }) => { 
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => { signOut(); navigate('/login'); };

    const getProfilePath = () => {
        if (!user) return '/';
        if (user.role === 'admin') return '/admin/settings';
        if (user.role === 'seller') return '/seller/settings';
        return '/dashboard/profile';
    };

    return (
        <Box className="dashboard-header">
            <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: '600' }}>
                {title || 'Dashboard'}
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
                            <Avatar src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : '/default-avatar.png'}>
                                {user.name ? user.name[0].toUpperCase() : 'U'}
                            </Avatar>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={() => { navigate(getProfilePath()); handleClose(); }}>
                                <FiUser style={{ marginRight: '8px' }}/> Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <FiLogOut style={{ marginRight: '8px' }}/> Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default DashboardHeader;