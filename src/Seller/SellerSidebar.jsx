import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiPlusSquare, FiShoppingBag  } from "react-icons/fi";
import '../Admin/Admin.css';
import logo from '../assets/images/tea-logo.png';

const SellerSidebar = () => {
    const navLinks = [
        { path: '/seller/dashboard', icon: <RxDashboard />, name: 'Overview' },
        { path: '/seller/products', icon: <FiPackage />, name: 'My Products' },
        { path: '/seller/add-product', icon: <FiPlusSquare />, name: 'Add New Product' },
        { path: '/seller/orders', icon: <FiShoppingBag />, name: 'Orders' },
    ];

    return(
        <aside className="sidebar">
            <div className="sidebar-header">
                <Link to="/">
                <img src={logo} alt="Aura Tea Logo" className="sidebar-logo" />
                </Link>
            </div>
            <nav className="sidebar-nav">
                {navLinks.map(link => (
                    <NavLink
                    key={link.name}
                    to={link.path}
                    className="sidebar-link"
                    end={link.path === '/seller/dashboard'}
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default SellerSidebar;


