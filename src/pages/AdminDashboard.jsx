import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import DashboardHeader from '../Admin/DashboardHeader'; 
import AdminOverview from '../Admin/AdminOverview';
import UserList from '../Admin/UserList';
import ProductList from '../Admin/ProductList';
import Settings from '../Admin/Settings';
import '../Admin/Admin.css';

const AdminDashboard = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="content-wrapper"> 
                <DashboardHeader /> 
                <main className="main-content">
                    <Routes>
                        <Route index element={<AdminOverview />} />
                        <Route path="dashboard" element={<AdminOverview />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;