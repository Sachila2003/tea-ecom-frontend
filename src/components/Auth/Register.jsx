import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TextField, Button, Box, Typography, InputAdornment } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiGift } from 'react-icons/fi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        invitationCode: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signUp(formData);
            alert('Registration successful! Please check your email or login.');
            navigate('/login');
        } catch (err) {
            console.error("Registration failed:", err);
            setError(err.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <Box sx={{
            marginTop: '50px',
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
                marginTop: '50px',
                background: `url('https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center/cover`,
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
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 500, mb: 2 }}>
                        Welcome to Aura Tea 
                    </Typography>
                    <Typography variant="h8" sx={{ fontWeight: 400, color: '#e0e0e0' }}>
                        Begin your journey into the world of authentic Ceylon tea. Create an account to explore our exclusive collection.
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
                        Create Your Account
                    </Typography>

                    {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}
                    
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Full Name" type="text" name="name"
                            value={formData.name} onChange={handleChange}
                            required fullWidth margin="normal"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><FiUser color="#888" /></InputAdornment>),
                            }}
                            sx={textFieldStyles}
                        />
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
                        <TextField
                            label="Invitation Code (Optional)" type="text" name="invitationCode"
                            value={formData.invitationCode} onChange={handleChange}
                            fullWidth margin="normal" variant="outlined"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><FiGift color="#888" /></InputAdornment>),
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
                            Register
                        </Button>
                    </form>
                    <Typography sx={{ mt: 2, color: '#a7a7a7', textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login" sx={{ color: '#00e599', fontWeight: 600, textDecoration: 'none' }}>
                            Login Here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};



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

export default Register;