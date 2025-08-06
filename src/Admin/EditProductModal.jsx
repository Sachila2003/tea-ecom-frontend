import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, Button, 
    TextField, Select, MenuItem, FormControl, InputLabel, Box, Avatar
} from '@mui/material';

const EditProductModal = ({ open, onClose, product, onSave }) => {
    const [formData, setFormData] = useState({ 
        title: '', description: '', price: '', status: '', stock: 0, category: '' 
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                description: product.description || '',
                price: product.price || 0,
                status: product.status || 'pending',
                stock: product.stock || 0,
                category: product.category || ''
            });
            setPreview(`http://localhost:5000/${product.imageUrl}`);
            setImageFile(null);
        }
    }, [product]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleSave = () => onSave(product._id, formData, imageFile);

    if (!product) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Product: {product.title}</DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center', my: 2 }}>
                    <Avatar src={preview} variant="rounded" sx={{ width: 120, height: 120, margin: '0 auto', mb: 1 }} />
                    <Button variant="outlined" component="label">
                        Change Image
                        <input type="file" name="image" hidden onChange={handleImageChange} accept="image/*" />
                    </Button>
                </Box>
                <TextField margin="dense" label="Product Title" type="text" fullWidth name="title" value={formData.title} onChange={handleChange} />
                <TextField margin="dense" label="Description" type="text" fullWidth multiline rows={4} name="description" value={formData.description} onChange={handleChange} />
                <TextField margin="dense" label="Price (Rs.)" type="number" fullWidth name="price" value={formData.price} onChange={handleChange} />
                <TextField margin="dense" label="Stock Quantity" type="number" fullWidth name="stock" value={formData.stock} onChange={handleChange} />
                <TextField margin="dense" label="Category" type="text" fullWidth name="category" value={formData.category} onChange={handleChange} />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select name="status" value={formData.status} label="Status" onChange={handleChange}>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};
export default EditProductModal;