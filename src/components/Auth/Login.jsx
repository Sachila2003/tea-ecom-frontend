import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Box, Typography, InputAdornment, Link } from "@mui/material";
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn, user } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // signIn function eken ena response eka 'response' kiyana variable ekt gnnw
            const response = await signIn(formData); 
            
            if (response && response.user && response.user.role) {
                const userRole = response.user.role;
                
                // Role ekt anuwa dashboard ek navigate krnw
                if (userRole === 'admin') {
                    navigate('/admin/dashboard');
                } else if (userRole === 'seller') {
                    navigate('/seller/dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError("Login successful, but user data is missing.");
            }
        } catch (err) {
            setError(err.msg || 'Invalid email or password.');
        }
    };
    
    const navigateBasedOnRole = (role) => {
        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else if (role === 'seller') {
            navigate('/seller/dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            fontFamily: 'Poppins, sans-serif'
        }}>
            <Box sx={{
                flex: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                color: '#fff',
                background: `url('https://images.pexels.com/photos/230491/pexels-photo-230491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center/cover`,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.85), rgba(18, 18, 18, 0.65))',
                    zIndex: 1
                }
            }}>
                <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'left', maxWidth: 450, p: 4 }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
                        Welcome Back!
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#e0e0e0' }}>
                        Log in to continue your journey and manage your tea collection.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#121212',
                p: 3
            }}>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Typography variant="h4" component="h2" sx={{ color: '#fff', fontWeight: 600, textAlign: 'center', mb: 4 }}>
                        Login to Your Account
                    </Typography>

                    {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}
                    
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email" type="email" name="email"
                            value={formData.email} onChange={handleChange}
                            required fullWidth margin="normal" variant="outlined"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><FiMail color="#888" /></InputAdornment>),
                            }}
                            sx={textFieldStyles}
                        />
                        <TextField
                            label="Password" type="password" name="password"
                            value={formData.password} onChange={handleChange}
                            required fullWidth margin="normal" variant="outlined"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><FiLock color="#888" /></InputAdornment>),
                            }}
                            sx={textFieldStyles}
                        />

                        <Button
                            type="submit" variant="contained"
                            fullWidth
                            sx={{
                                mt: 2, mb: 2, p: 1.5,
                                backgroundColor: '#00e599', color: '#121212',
                                fontWeight: 600, fontSize: '1rem',
                                '&:hover': { backgroundColor: '#0bd192' }
                            }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography sx={{ mt: 2, color: '#a7a7a7', textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link component={RouterLink} to="/register" sx={{ color: '#00e599', fontWeight: 600, textDecoration: 'none' }}>
                            Register Here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

// Common styles for TextFields (මේක වෙනම file එකක තියනවා නම් import කරගන්න)
const textFieldStyles = {
    '& .MuiInputBase-root': {
        color: '#fff',
        backgroundColor: '#1e1e1e',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#444',
        },
        '&:hover fieldset': {
            borderColor: '#666',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#00e599',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#888',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#00e599',
    },
};

export default Login;