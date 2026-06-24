import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiHome /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;