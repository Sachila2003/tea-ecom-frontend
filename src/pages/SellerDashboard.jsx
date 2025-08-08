import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SellerSidebar from '../Seller/SellerSidebar';
import AddProduct from '../Seller/AddProduct';
import '../Admin/Admin.css';
import DashboardHeader from '../Admin/DashboardHeader';

const SellerOverview = () => (
    <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Typography variant="h5">Seller Overview</Typography>
        <Typography sx={{mt: 2, color: '#a7a7a7'}}>Welcome to your dashboard! Here you can see a summary of your sales and products.</Typography>
    </Paper>
);

const SellerProducts = () => (
    <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Typography variant="h5">My Products</Typography>
        <Typography sx={{mt: 2, color: '#a7a7a7'}}>Here you can manage all the products you have added.</Typography>
    </Paper>
);

const SellerOrders = () => (
    <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Typography variant="h5">My Orders</Typography>
        <Typography sx={{mt: 2, color: '#a7a7a7'}}>View and manage orders for your products.</Typography>
        {/* Seller's order table would go here */}
    </Paper>
);

import { Paper, Typography } from '@mui/material';

const SellerDashboard = () => {
    return (
        <div className="admin-layout">
            <SellerSidebar />
            <div className="content-wrapper">
                <DashboardHeader title="Seller Dashboard" />
                <main className="main-content">
                    <Routes>
                        <Route index element={<SellerOverview />} /> 
                        <Route path="dashboard" element={<SellerOverview />} />

                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="products" element={<SellerProducts />} />
                        <Route path="orders" element={<SellerOrders />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default SellerDashboard;