import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import VendorDetailPage from './pages/VendorDetailPage';
import Quotations from './pages/Quotations';
import QuotationDetailPage from './pages/QuotationDetailPage';
import ComparisonPage from './pages/ComparisonPage';
import NotFound from './pages/NotFound';
import Layout from './components/common/Layout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route index element={<Navigate to="/dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="vendors" element={<Vendors />} />
                  <Route path="vendors/:id" element={<VendorDetailPage />} />
                  <Route path="quotations" element={<Quotations />} />
                  <Route path="quotations/:id" element={<QuotationDetailPage />} />
                  <Route path="comparison" element={<ComparisonPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;