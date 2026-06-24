import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getQuotation, updateQuotationStatus } from '../api/quotationApi';
import Loader from '../components/common/Loader';
import QuotationStatusBadge from '../components/quotation/QuotationStatusBadge';
import { formatDateTime } from '../utils/formatDate';
import { FiArrowLeft, FiDollarSign, FiUser, FiCalendar, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const QuotationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getQuotation(id);
      setQuotation(data);
    } catch (error) {
      toast.error('Failed to load quotation details');
      navigate('/quotations');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!window.confirm(`Change status to "${newStatus}"?`)) return;
    
    setUpdating(true);
    try {
      await updateQuotationStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;
  if (!quotation) return null;

  const statusOptions = ['pending', 'received', 'reviewed', 'approved', 'rejected'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/quotations"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quotation Details
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={quotation.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <QuotationStatusBadge status={quotation.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {quotation.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {quotation.description}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FiDollarSign className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${quotation.quotationAmount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiCalendar className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
                  <p className="text-gray-900 dark:text-white">
                    {formatDateTime(quotation.submissionDate)}
                  </p>
                </div>
              </div>
              {quotation.vendorReference && (
                <div className="flex items-center gap-3 md:col-span-2">
                  <FiFileText className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vendor Reference</p>
                    <p className="text-gray-900 dark:text-white">
                      {quotation.vendorReference}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <FiUser className="text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Vendor Information
              </h3>
            </div>
            {quotation.vendor ? (
              <div>
                <Link
                  to={`/vendors/${quotation.vendor._id}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-3 -m-3 transition-colors"
                >
                  <p className="font-medium text-gray-900 dark:text-white">
                    {quotation.vendor.vendorName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {quotation.vendor.companyName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {quotation.vendor.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {quotation.vendor.contactNumber}
                  </p>
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Vendor information not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationDetailPage;