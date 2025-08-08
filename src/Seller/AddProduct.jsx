import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Grid, TextField, Button, Alert, Avatar } from "@mui/material";


const darkThemeTextFieldStyles = {
    '& .MuiInputBase-root': { color: '#fff' },
    '& label.Mui-focused': { color: '#00e599' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#444' },
        '&:hover fieldset': { borderColor: '#666' },
        '&.Mui-focused fieldset': { borderColor: '#00e599' },
    },
    '& label': { color: '#a7a7a7' },
}

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: null,
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const productData = new FormData();
        productData.append('title', formData.title);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('stock', formData.stock);
        productData.append('category', formData.category);
        if (imageFile) {
            productData.append('image', imageFile);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authorization error. Please log in again.');
                setIsLoading(false);
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.post('http://localhost:5000/api/products', productData, config);

            setSuccess('Product added successfully! It is now pending for admin approval.');
            setFormData({ title: '', description: '', price: '', stock: '', category: '' });
            setImageFile(null);
            setPreview('');

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Add a New Product</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Product Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            sx={darkThemeTextFieldStyles}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Product Description"
                            name="description"
                            type="text"
                            value={formData.description}
                            multiline rows={4}
                            onChange={handleChange}
                            required
                            sx={darkThemeTextFieldStyles}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price (Rs.)"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            sx={darkThemeTextFieldStyles}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Stock Quantity"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            sx={darkThemeTextFieldStyles}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            sx={darkThemeTextFieldStyles}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={preview} variant="rounded" sx={{ width: 60, height: 60, mr: 2 }} />
                        <Button variant="outlined" component="label">Upload Image
                            <input type="file" name="image" hidden onChange={handleImageChange} required />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" disabled={isLoading} sx={{ backgroundColor: '#00e599', '&:hover': { backgroundColor: '#0bd192' } }}>
                            {isLoading ? 'Adding...' : 'Add Product'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddProduct;
