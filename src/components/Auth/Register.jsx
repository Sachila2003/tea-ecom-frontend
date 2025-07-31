import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {
    TextField,
    InputLabel, FormControl, MenuItem
    , Select, Button, Box, Typography, Link, Card, CardContent
} from "@mui/material";

const Register = () => {
    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: '',
            role: ''
        }
    );
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {signUp} = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await signUp(formData);
            navigate('/login');
        } catch (error) {
            setError(error.message || 'Registration failed');
        }
    }

    return (
        <Box sx={{p: 3, mt: 6}}>
            <Card>
                <CardContent>
                    <Typography
                        variant="h4" gutterBottom
                        color="primary"
                    >
                        Register
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleRegister}>
                        <TextField
                            label="Full Name" type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Email" type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password" type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="seller">Seller</MenuItem>
                                <MenuItem value="customer">Customer</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={{mt: 2, mb: 2, width: "30%", alignContent: "center"}}
                        >Register</Button>
                    </form>
                    <Typography sx={{mt: 2}}>
                        Already have an account? <Link href="/login">Login here</Link>
                    </Typography>
                </CardContent>
            </Card>

        </Box>
    );
}

export default Register