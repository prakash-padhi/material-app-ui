import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <p style={{ textAlign: "center" }}>404 Not Found</p>
            <Link to="/">Home</Link>
        </div>
    );
}
