import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: any }) => {
    const user_id = useSelector((state: any) => state.auth.user_id);
    if (user_id === null) {
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoute