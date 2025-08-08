import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    Box, Typography, Paper, Grid, TextField, Button, Alert, Avatar,
    InputAdornment, IconButton
} from '@mui/material';

import { FiEye, FiEyeOff } from 'react-icons/fi';

const darkThemeTextFieldStyles = {
    '& label.Mui-focused': { color: '#00e599' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#444' },
        '&:hover fieldset': { borderColor: '#666' },
        '&.Mui-focused fieldset': { borderColor: '#00e599' },
    },
    '& .MuiInputBase-input': { color: '#fff' },
    '& label': { color: '#a7a7a7' },
};

const Settings = () => {
    const { user, loading: authLoading, updateUserContext } = useAuth();

    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [settings, setSettings] = useState({ sellerInvitationCode: '', shippingFee: 0 });
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState('');

    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({ name: user.name, email: user.email });
            if (user.profilePic) {
                setPreview(`http://localhost:5000/${user.profilePic}`);
            }
        }

        const fetchSettings = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:5000/api/settings', config);
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings:", error);
                setMessage({ type: 'error', text: 'Could not load website settings.' });
            }
        };
        fetchSettings();
    }, []);

    const handleProfileChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    const handleSettingsChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async () => {
        setMessage({ text: '' });
        setIsLoading(true);
        
        console.log("--- UPDATE PROFILE START ---");
    
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No token found");
    
            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('email', profileData.email);
            if (profilePic) {
                formData.append('profilePic', profilePic);
            }
            
            console.log("1. Sending data to backend:", { name: profileData.name, email: profileData.email, hasImage: !!profilePic });
    
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } };
            
            const response = await axios.put('http://localhost:5000/api/users/profile', formData, config);
            
            console.log("2. Backend responded with:", response.data);
    
            // --- Context Update ---
            console.log("3. Calling updateUserContext...");
            updateUserContext(response.data);
            console.log("4. updateUserContext finished.");
    
            // --- Message Update ---
            console.log("5. Setting success message...");
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            console.log("6. Success message set.");
            setPreview(null);
    
        } catch (error) {
            console.error("--- UPDATE PROFILE FAILED ---");
            console.error("Caught Error Object:", error);
            
            const errorMessage = error.response?.data?.msg || 'Failed to update profile.';
            console.error("Final Error Message:", errorMessage);
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setIsLoading(false);
            console.log("--- UPDATE PROFILE END ---");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        setIsLoading(true);
        setMessage({ text: '' });
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const body = { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword };
            const { data } = await axios.put('http://localhost:5000/api/users/change-password', body, config);
            setMessage({ type: 'success', text: data.msg });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.msg || 'Failed to change password.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        setMessage({ text: '' });
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put('http://localhost:5000/api/settings', settings, config);
            setMessage({ type: 'success', text: 'Website settings saved successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save settings.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) return <div>Loading...</div>;

    return (
        <Box>
            <Typography variant="h4" sx={{ color: '#fff', mb: 3 }}>Settings</Typography>
            {message.text && <Alert severity={message.type} onClose={() => setMessage({ text: '' })} sx={{ mb: 2 }}>{message.text}</Alert>}

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>My Profile</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar
                                src={
                                    preview ||
                                    (user && user.profilePic ?
                                        `http://localhost:5000/${user.profilePic}` :
                                        '/avatars/default-avatar.png'
                                    )
                                }
                                sx={{ width: 80, height: 80, mr: 2 }}
                            />
                            <Button variant="outlined" component="label" disabled={isLoading}>
                                Change Picture
                                <input type="file" hidden onChange={handleProfilePicChange} />
                            </Button>
                        </Box>
                        <TextField fullWidth label="Full Name" name="name" value={profileData.name} onChange={handleProfileChange} sx={{ ...darkThemeTextFieldStyles, mb: 2 }} disabled={isLoading} variant="outlined" />
                        <TextField fullWidth label="Email Address" name="email" type="email" value={profileData.email} onChange={handleProfileChange} sx={{ ...darkThemeTextFieldStyles, mb: 2 }} disabled={isLoading} variant="outlined" />
                        <Button variant="contained" onClick={handleUpdateProfile} disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Profile'}
                        </Button>
                        <hr style={{ borderColor: '#2a2a2a', margin: '2rem 0' }} />
                        <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
                        <form onSubmit={handleChangePassword}>
                            <TextField
                                fullWidth
                                label="Current Password"
                                name="currentPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                sx={{ ...darkThemeTextFieldStyles, mb: 2 }}
                                disabled={isLoading}
                                required
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#a7a7a7' }}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                fullWidth
                                label="New Password"
                                name="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                sx={{ ...darkThemeTextFieldStyles, mb: 2 }}
                                disabled={isLoading}
                                required
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#a7a7a7' }}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                sx={{ ...darkThemeTextFieldStyles, mb: 2 }}
                                disabled={isLoading}
                                required
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#a7a7a7' }}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button type="submit" variant="contained" disabled={isLoading}>
                                {isLoading ? 'Changing...' : 'Change Password'}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Website Settings</Typography>
                        <TextField fullWidth label="Seller Invitation Code" name="sellerInvitationCode" value={settings.sellerInvitationCode} onChange={handleSettingsChange} sx={{ ...darkThemeTextFieldStyles, mb: 2 }} disabled={isLoading} variant="outlined" />
                        <TextField fullWidth label="Shipping Fee (Rs.)" name="shippingFee" type="number" value={settings.shippingFee} onChange={handleSettingsChange} sx={{ ...darkThemeTextFieldStyles, mb: 2 }} disabled={isLoading} variant="outlined" />
                        <Button variant="contained" onClick={handleSaveSettings} disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Website Settings'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Settings;