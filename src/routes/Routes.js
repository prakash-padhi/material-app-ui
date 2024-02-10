import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { useAuth } from "../context/AuthContext";

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        ),
        errorElement: <NotFound />
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },
    {
        path: '/signup',
        element: (
            <PublicRoute>
                <SignUp />
            </PublicRoute>
        )
    }
]);

export default function Router() {
    const { isLoading } = useAuth();
    return (
        isLoading ? (
            <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <CircularProgress />
            </div>
        ) : <RouterProvider router={router} />
    );
}
