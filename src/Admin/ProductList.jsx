import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductModal from './EditProductModal';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Chip, CircularProgress, 
    Alert, IconButton, Tooltip, Avatar
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './Admin.css';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Backend eken products tika fetch krn function ek
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get('http://localhost:5000/api/products/all', config);
            setProducts(data);
        } catch (err) {
            setError('Failed to fetch products.');
            console.error("Fetch Products Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Component ek mount weddi products tik fetch krgnnw
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to permanently delete this product?')) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`http://localhost:5000/api/products/${productId}`, config);
                alert('Product deleted successfully.');
                fetchProducts();
            } catch (err) {
                alert(err.response?.data?.msg || 'Failed to delete product.');
                console.error("Delete Product Error:", err);
            }
        }
    };

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleSaveChanges = async (productId, updatedData, imageFile) => {
        try {
            const token = localStorage.getItem('token');
            const dataToUpdate = new FormData();
            
            Object.keys(updatedData).forEach(key => {
                dataToUpdate.append(key, updatedData[key]);
            });

            if (imageFile) {
                dataToUpdate.append('image', imageFile);
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            await axios.put(`http://localhost:5000/api/products/${productId}`, dataToUpdate, config);
            alert('Product updated successfully.');
            handleCloseModal();
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to update product.');
            console.error("Update Product Error:", err);
        }
    };

    // Status ekt color set krnw
    const getStatusChipColor = (status) => {
        if (status === 'approved') return 'success';
        if (status === 'rejected') return 'error';
        return 'warning';
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt:4}}><CircularProgress/></Box>;
    if (error) return <Alert severity='error' sx={{mt:2}}>{error}</Alert>;

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#1e1e1e'}}>
                <Typography variant='h5' sx={{p:2, color: '#fff', fontWeight: '600'}}>
                    Product Management
                </Typography>
                <TableContainer sx={{maxHeight: 740}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderStyles}>Image</TableCell>
                                <TableCell sx={tableHeaderStyles}>Title</TableCell>
                                <TableCell sx={tableHeaderStyles}>Category</TableCell>
                                <TableCell sx={tableHeaderStyles}>Price</TableCell>
                                <TableCell sx={tableHeaderStyles}>Stock</TableCell>
                                <TableCell sx={tableHeaderStyles}>Status</TableCell>
                                <TableCell align="center" sx={tableHeaderStyles}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length > 0 ? products.map((product) => (
                                <TableRow hover key={product._id}>
                                    <TableCell sx={tableCellStyles}>
                                        <Avatar variant='rounded' src={`http://localhost:5000/${product.imageUrl.replace(/\\/g, "/")}`} />
                                    </TableCell>
                                    <TableCell sx={tableCellStyles}>{product.title}</TableCell>
                                    <TableCell sx={tableCellStyles}>{product.category}</TableCell>
                                    <TableCell sx={tableCellStyles}>Rs. {product.price}</TableCell>
                                    <TableCell sx={tableCellStyles}>{product.stock}</TableCell>
                                    <TableCell sx={tableCellStyles}>
                                        <Chip
                                        label={product.status}
                                        color={getStatusChipColor(product.status)}
                                        size='small'
                                        sx={{ textTransform: 'capitalize' }}
                                        />
                                    </TableCell>
                                    <TableCell align='center' sx={tableCellStyles}>
                                        <Tooltip title='Edit Product'>
                                            <IconButton onClick={() => handleEditClick(product)} sx={{color: '#82aaff'}}>
                                                <FiEdit/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete Product'>
                                            <IconButton onClick={() => handleDelete(product._id)} sx={{color: '#ff5252'}}>
                                                <FiTrash2/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={7} align='center' sx={tableCellStyles}>
                                        No Products found in the database.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <EditProductModal
                open={isModalOpen}
                onClose={handleCloseModal}
                product={currentProduct}
                onSave={handleSaveChanges}
            />
        </>
    );
};

const tableHeaderStyles = {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontWeight: 'bold'
};
const tableCellStyles = {
    color: '#c5c5c5',
    borderColor: '#2a2a2a'
};

export default ProductList;