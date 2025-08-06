import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import './Admin.css';
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatCard = ({ title, value, icon }) => (
    <Paper className="stat-card">
        <Box className="stat-icon-wrapper">{icon}</Box>
        <Box>
            <Typography variant="h4" className="stat-value">{value}</Typography>
            <Typography variant="body1" className="stat-title">{title}</Typography>
        </Box>
    </Paper>
);

const SalesChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChartdata = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` }};
                const { data } = await axios.get('http://localhost:5000/api/dashboard/sales-chart', config);

                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Daily Sales (Rs.)',
                            data: data.data,
                            borderColor: '#00e599',
                            backgroundColor: 'rgba(0, 229, 153, 0.1)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching sales chart data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchChartdata();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { Legend: { display: false}},
        scales: {
            x: { ticks: { color: '#a7a7a7'}},
            y: { ticks: { color: '#a7a7a7'}}
        }

    };
    if (loading) return <CircularProgress />;
    if (!chartData) return <Typography sx={{color: '#a7a7a7'}}>No sales data available</Typography>
    return <Line options={options} data={chartData}/>
}

const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Local Storage ekn Token ek gnnw
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Authorization token not found. Please log in again.");
                    setLoading(false);
                    return;
                }
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                
                //Backend API Endpoint ekt GET request ek yawnw
                const { data } = await axios.get('http://localhost:5000/api/dashboard/stats', config);

                setStats(data);

            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                const errorMessage = err.response?.data?.error || err.message || 'Failed to load dashboard data.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatSales = (amount) => {
        if (typeof amount !== 'number') return 'N/A';
        if (amount >= 1000000) {
            return `Rs. ${(amount / 1000000).toFixed(1)}M`;
        }
        if (amount >= 1000) {
            return `Rs. ${(amount / 1000).toFixed(0)}K`;
        }
        return `Rs. ${amount}`;
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!stats) {
        return <Alert severity="info">No statistics available at the moment.</Alert>;
    }
    return (
        <Box>
            <Typography variant="h4" sx={{ color: '#fff', mb: 3, fontWeight: '600' }}>
                Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Sales" value={formatSales(stats.totalSales)} icon={<FiDollarSign />} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Orders" value={stats.totalOrders} icon={<FiShoppingCart />} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Products" value={stats.totalProducts} icon={<FiPackage />} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Users" value={stats.totalUsers} icon={<FiUsers />} />
                </Grid>
            </Grid>
            <Paper className="chart-container">
                <Typography variant="h6" sx={{ color: '#fff' }}>Sales Overview (Last 7 days)</Typography>
                <Box sx={{ height: '300px'}}>
                    <SalesChart/>
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminOverview;