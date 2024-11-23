import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiFileText, FiUserPlus, FiCalendar, FiDollarSign, FiUsers } from 'react-icons/fi';

export default function Sidebar() {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: FiUsers, label: 'Employee Report', path: '/' },
    { icon: FiUserPlus, label: 'Add Employee', path: '/add-employee' },
    { icon: FiCalendar, label: 'Leaves Report', path: '/leaves-report' },
    { icon: FiCalendar, label: 'Add Leaves', path: '/add-leaves' },
    { icon: FiDollarSign, label: 'Salary Report', path: '/salary-report' },
    { icon: FiDollarSign, label: 'Add Salary', path: '/add-salary' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">
          <FiFileText className="sidebar-logo" />
          {windowWidth > 768 && 'EMS System'}
        </h3>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon className="sidebar-menu-icon" />
            {windowWidth > 768 && <span className="sidebar-menu-text">{item.label}</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
}