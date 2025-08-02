import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress, Alert
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import '../Admin/Admin.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found. Please login.");
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await axios.get('http://localhost:5000/api/users', config);
                setUsers(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "An error occurred while fetching users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
}