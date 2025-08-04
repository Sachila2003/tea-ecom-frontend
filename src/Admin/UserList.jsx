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

    const getRoleChipColor = (role) => {
        if (role === 'admin') return 'error';
        if (role === 'seller') return 'warning';
        return 'primary';
    };
     if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4}}>
                <CircularProgress/>
            </Box>
        );
     }

     if (error) {
        return <Alert severity="error" sx={{mt:2}}>{error}</Alert>;
     }

     return (
        <Paper sx={{width: '100%', overflow: 'hidden', backgroundColor: '#1e1e1e'}}>
            <Typography variant="h5" sx={{p: 2, color: '#fff', fontWeight: '600'}}>
                User Management
            </Typography>
            <TableContainer sx={{ maxHeight: 640}}>
                <Table stickyHeader aria-label="sticky table"></Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableHeaderStyles}>Name</TableCell>
                        <TableCell sx={tableHeaderStyles}>Email</TableCell>
                        <TableCell sx={tableHeaderStyles}>Role</TableCell>
                        <TableCell sx={tableHeaderStyles}>Status</TableCell>
                        <TableCell sx={tableHeaderStyles}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow hover role="checkbox" tableIndex={-1} key={user.id}>
                            <TableCell sx={tableCellStyles}>{user.name}</TableCell>
                            <TableCell sx={tableCellStyles}>{user.emai}</TableCell>
                            <TableCell sx={tableCellStyles}>
                                <Chip label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} color={getRoleChipColor(user.role)} />
                            </TableCell>
                            <TableCell sx={tableCellStyles}>
                                <Chip
                                lable={user.status}
                                color={user.status === 'active' ? 'success' : 'default'}
                                size="small"
                                />
                            </TableCell>
                            <TableCell sx={tableCellStyles}>
                                {/* action button psse dmu */}
                                <button>Edit</button>
                                <button>Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
            
        </Paper>
     );
};

//common styles for table

const tableHeaderStyles = {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontWeight: 'bold',
};

const tableCellStyles = {
    color: '#5c5c5c',
    borderColor: '#2a2a2a'
};

export default UserList;