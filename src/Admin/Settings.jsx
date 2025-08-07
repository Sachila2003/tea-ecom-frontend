import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    Box, Typography, Paper, Grid, TextField, Button, Alert, Avatar,
    InputAdornment, IconButton
} from '@mui/material';

// react-icons import එකත් තියෙනවද බලන්න
import { FiEye, FiEyeOff } from 'react-icons/fi';

// --- MUI TextField වලට common dark theme styles ---
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
    const { user, setUser, loading: authLoading } = useAuth();

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
    }, [user]);

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
        try {
            // 1. Local Storage එකෙන් Token එක ගන්නවා
            const token = localStorage.getItem('token');
            if (!token) {
                // Token එකක් නැත්නම්, මෙතනින්ම නවත්තනවා
                setMessage({ type: 'error', text: 'No token found. Please log in again.' });
                setIsLoading(false);
                return;
            }
    
            // 2. FormData object එක හදනවා
            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('email', profileData.email);
            if (profilePic) {
                formData.append('profilePic', profilePic);
            }
    
            // 3. Request Config එක, Token එකත් එක්ක හදනවා
            const config = {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` // <-- !! මෙන්න වැදගත්ම දේ !!
                } 
            };
            
            // 4. PUT request එක, අලුත් config එකත් එක්ක යවනවා
            const { data } = await axios.put('http://localhost:5000/api/users/profile', formData, config);
            
            updateUserContext(data); // AuthContext එක update කරනවා
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
    
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.msg || 'Failed to update profile.' });
        } finally {
            setIsLoading(false);
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