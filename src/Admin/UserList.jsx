import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Chip, CircularProgress, 
    Alert, IconButton, Tooltip, Switch
} from '@mui/material';
import { FiEdit } from 'react-icons/fi';
import './Admin.css';
import EditUserModal from './EditUserModal';

const UserList = () => {
    const { user: loggedInUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get('http://localhost:5000/api/users', config);
            setUsers(data);
        } catch (err) {
            setError(err.response?.data?.msg || err.message || "Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleStatusToggle = async (userToUpdate) => {
        const newStatus = userToUpdate.status === 'active' ? 'inactive' : 'active';
        if (window.confirm(`Are you sure you want to set this user's status to '${newStatus}'?`)) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.put(`http://localhost:5000/api/users/${userToUpdate._id}`, { status: newStatus }, config);
                alert(`User status updated to ${newStatus}.`);
                fetchUsers();
            } catch (err) {
                alert(err.response?.data?.msg || `Failed to update status.`);
                console.error(err);
            }
        }
    };
    
    const handleEditClick = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };



    const handleSaveChanges = async (userId, updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData, config);
            alert('User updated successfully.');
            handleCloseModal();
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to update user.');
            console.error(err);
        }
    };

    const getRoleChipColor = (role) => {
        if (role === 'admin') return 'error';
        if (role === 'seller') return 'warning';
        return 'info';
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#1e1e1e' }}>
                <Typography variant="h5" sx={{ p: 2, color: '#fff', fontWeight: '600' }}>
                    User Management
                </Typography>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderStyles}>Name</TableCell>
                                <TableCell sx={tableHeaderStyles}>Email</TableCell>
                                <TableCell sx={tableHeaderStyles}>Role</TableCell>
                                <TableCell align="center" sx={tableHeaderStyles}>Status</TableCell>
                                <TableCell align="center" sx={tableHeaderStyles}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? users.map((user) => (
                                <TableRow hover key={user._id}>
                                    <TableCell sx={tableCellStyles}>{user.name}</TableCell>
                                    <TableCell sx={tableCellStyles}>{user.email}</TableCell>
                                    <TableCell sx={tableCellStyles}>
                                        <Chip label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} color={getRoleChipColor(user.role)} size="small" />
                                    </TableCell>
                                    <TableCell align="center" sx={tableCellStyles}>
                                        {loggedInUser && loggedInUser.id === user._id ? (
                                            <Chip label={user.status} color={user.status === 'active' ? 'success' : 'default'} size="small" />
                                        ) : (
                                            <Tooltip title={`Set to ${user.status === 'active' ? 'inactive' : 'active'}`}>
                                                <Switch
                                                    checked={user.status === 'active'}
                                                    onChange={() => handleStatusToggle(user)}
                                                    color="success"
                                                />
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                    <TableCell align="center" sx={tableCellStyles}>
                                        <Tooltip title="Edit User Details">
                                            <IconButton onClick={() => handleEditClick(user)} sx={{ color: '#82aaff' }}>
                                                <FiEdit />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={tableCellStyles}>No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <EditUserModal 
                open={isModalOpen}
                onClose={handleCloseModal}
                user={currentUser}
                onSave={handleSaveChanges}
                loggedInUser={loggedInUser}
            />
        </>
    );
};

const tableHeaderStyles = { backgroundColor: '#2a2a2a', color: '#fff', fontWeight: 'bold' };
const tableCellStyles = { color: '#c5c5c5', borderColor: '#2a2a2a' };

export default UserList;