//components tik thiygnn
import React from "react";
import { Box, paperClasses, Typography, Grid } from "@mui/material";
import './Admin.css';

const StatCard = ({ title, value, icon}) => (
    <Paper className="stat-card">
        <Box>
            <Typography variant="h4" className="stat-value">{value}</Typography>
            <Typography variant="body1" className="stat-title">{title}</Typography>
        </Box>
    </Paper>
);

const AdminOverview = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{color: '#fff', mb: 3, fontWeight: '600'}}>
                Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Sales" value="Rs. 1.2M"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Order" value="452"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Products" value="120"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total Users" value="520"/>
                </Grid>
            </Grid>
            <Paper className="chart-container">
                <Typography variant="h6" sx={{color: '#fff'}}>Sales Overview</Typography>
            </Paper>
        </Box>
    );
};

export default AdminOverview;

