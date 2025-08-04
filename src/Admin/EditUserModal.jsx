import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, Button, 
    TextField, Select, MenuItem, FormControl, InputLabel, Typography
} from '@mui/material';

const EditUserModal = ({ open, onClose, user, onSave, loggedInUser }) => {
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'customer'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(user._id, formData);
    };

    if (!user) return null;

    // Edit krnne thamnd kiyl blnw
    const isEditingSelf = loggedInUser && loggedInUser.id === user._id;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
                Edit User: {user.name}
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: '#1e1e1e', pt: '20px !important' }}>
                <TextField margin="dense" label="Full Name" sx={{ input: { color: '#fff' }, label: { color: '#fff' } }} type="text" fullWidth name="name" value={formData.name} onChange={handleChange} />
                <TextField margin="dense" label="Email" sx={{ input: { color: '#fff' }, label: { color: '#fff' } }} type="email" fullWidth name="email" value={formData.email} onChange={handleChange} />
                <FormControl fullWidth margin="dense">
                    <InputLabel sx={{ color: '#fff' }}>Role</InputLabel>
                    <Select name="role" sx={{ color: '#fff' }} value={formData.role} label="Role" onChange={handleChange} disabled={isEditingSelf}>
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="seller">Seller</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    {isEditingSelf && <Typography variant="caption" sx={{ color: 'orange', mt: 1 }}>Admins cannot change their own role.</Typography>}
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#1e1e1e' }}>
                <Button onClick={onClose} sx={{ color: '#a7a7a7' }}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: '#00e599', '&:hover': { backgroundColor: '#0bd192' } }}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;