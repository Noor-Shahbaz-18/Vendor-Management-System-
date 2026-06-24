import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVendor } from '../api/vendorApi';
import { getQuotations } from '../api/quotationApi';
import Loader from '../components/common/Loader';
import QuotationStatusBadge from '../components/quotation/QuotationStatusBadge';
import { formatDate } from '../utils/formatDate';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const VendorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [vendorData, quotationsData] = await Promise.all([
        getVendor(id),
        getQuotations({ vendor: id }),
      ]);
      setVendor(vendorData);
      setQuotations(quotationsData);
    } catch (error) {
      toast.error('Failed to load vendor details');
      navigate('/vendors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!vendor) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/vendors"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Vendor Details
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vendor.vendorName}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{vendor.companyName}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/comparison?vendor=${vendor._id}`}
                  className="btn-primary"
                >
                  Compare Quotations
                </Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white">{vendor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                  <p className="text-gray-900 dark:text-white">{vendor.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <FiMapPin className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-gray-900 dark:text-white">{vendor.businessAddress}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Joined {formatDate(vendor.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <FiFileText className="text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quotations ({quotations.length})
              </h3>
            </div>
            {quotations.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No quotations from this vendor yet.
              </p>
            ) : (
              <div className="space-y-3">
                {quotations.slice(0, 5).map((q) => (
                  <Link
                    key={q._id}
                    to={`/quotations/${q._id}`}
                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {q.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ${q.quotationAmount.toFixed(2)}
                        </p>
                      </div>
                      <QuotationStatusBadge status={q.status} />
                    </div>
                  </Link>
                ))}
                {quotations.length > 5 && (
                  <Link
                    to={`/quotations?vendor=${vendor._id}`}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    View all {quotations.length} quotations
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;