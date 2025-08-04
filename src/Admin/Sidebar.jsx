import React from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiUsers, FiSettings } from "react-icons/fi";
import './Admin.css';
import logo from '../../src/assets/images/tea-logo';

const Sidebar = () => {
    const navLinks = [
        { path: '/admin/dashboard', icon: <RxDashboard/>, name: 'Dashboard'},
        { path: '/admin/users' , icon: <FiUsers/>, name: 'Users'},
        {path: '/admin/products', icon: <FiPackage/>, name: 'Products'},
        { path: '/admin/settings', icon: <FiSettings/>, name: 'Settings'},
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={logo} alt="Admin Logo" className="sidebar-logo" />
            </div>
            <nav className="sidebar-nav">
                {navLinks.map(link => (
                    <NavLink
                    key={link.name}
                    to={link.path}
                    className="sidebar-link"
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;

