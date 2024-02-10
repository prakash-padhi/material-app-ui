import React from "react";
import { Button, Box } from "@mui/material";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
    const { signout } = useAuth();
    return (
        <div>
            <Header />
            <Box height={400} display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" color="inherit" onClick={signout}>Logout</Button>
            </Box>
        </div>
    );
}
