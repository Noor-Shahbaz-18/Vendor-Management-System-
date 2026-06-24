import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiBarChart2,
  FiActivity
} from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/vendors', icon: FiUsers, label: 'Vendors' },
    { path: '/quotations', icon: FiFileText, label: 'Quotations' },
    { path: '/comparison', icon: FiBarChart2, label: 'Comparison' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          VMS
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Vendor Management</p>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;