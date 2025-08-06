import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    TextField, Select, MenuItem, FormControl, InputLabel, Typography
} from '@mui/material';

const EditProductModal = ({ open, onClose, product, onSave}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: 0,
        category: '',
        status: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
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
    }, [product]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        onSave(product._id, formData, imageFile);
    };

    if (!product) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Product: {product.title}</DialogTitle>
            <DialogContent>
                <Box sx={{textAlign: 'center', my: 2}}>
                    <Avatar
                    src={preview}
                    variant='rounded'
                    sx={{width: 120, heigh: 120, margin: '0 auto', mb:1}}
                    />
                    <Button variant='outlined' component="label">
                        Change Image
                        <input type="file" name="image" hidden onChange={handleImageChange} accept="image/*" />
                    </Button>
                </Box>
                <TextField margin="dense" label="Product Title" type="text" fullWidth
                name="title" value={formData.title} onChange={handleChange} />
                <TextField margin="dense" label="Product Description" type="text" fullWidth
                name="description" value={formData.description} onChange={handleChange} />
                <TextField margin="dense" label="Product Price" type="number" fullWidth
                name="price" value={formData.price} onChange={handleChange} />
                <TextField margin="dense" label="Product Stock" type="number" fullWidth
                name="stock" value={formData.stock} onChange={handleChange} />
                <FormControl margin="dense" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                    >
                        <MenuItem value="tea">Tea</MenuItem>
                        <MenuItem value="coffee">Coffee</MenuItem>
                        <MenuItem value="snacks">Snacks</MenuItem>
                        <MenuItem value="beverages">Beverages</MenuItem>
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                    >
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
