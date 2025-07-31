import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TextField, Button, Box, Typography } from "@mui/material";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erorr, setErorr] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await signIn({email, password});
        navigate("/dashboard");
    } catch (error) {
        setErorr(error.message || "Login failed");
    }
  };

  return(
    <Box>
        <Typography variant="h4" gutterBottom>Login</Typography>
        {erorr && <Typography color="error">{erorr}</Typography>}
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email" type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)}
                required
            ></TextField>
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) =>
                    setPassword(e.target.value)}
                required
            ></TextField>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
            >Login</Button>
        </form>
    </Box>
  );
};

export default Login;