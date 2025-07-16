import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TextField } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn({ email, password });
            navigate('/dashboard');
        } catch (error) {
            setError(error.message || "Login failed");
        }
    };
    return (
        // --- FIX: 'BOx' නෙමෙයි 'Box' ---
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" variant="contained" size="large">
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Login;