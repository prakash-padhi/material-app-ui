import React from "react";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { signin } = useAuth();
    const [formValues, setFormValues] = React.useState({ username: "", password: "" });
    const [error, setError] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.username.trim() === "" || formValues.password.trim() === "") {
            setError("Please provide username/password");
        } else {
            signin({ username: formValues.username, password: formValues.password }, (result) => {
                if (result?.error) {
                    setError(result?.message);
                }
            });
        }
    };

    const handleChange = (e) => {
        setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {error ? <Alert severity="error" onClose={() => setError("")}>{error}</Alert> : null}
                    <Typography variant="h6" mt={5} textAlign="center">Sign In</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                    <Box textAlign="center">
                        <Link to="/signup">Register</Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
