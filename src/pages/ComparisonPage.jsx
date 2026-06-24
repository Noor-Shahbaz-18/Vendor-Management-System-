import React, { useState, useEffect } from 'react';
import { getAllQuotationsForComparison } from '../api/comparisonApi';
import ComparisonTable from '../components/comparison/ComparisonTable';
import BestQuoteHighlight from '../components/comparison/BestQuoteHighlight';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

const ComparisonPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterVendor, setFilterVendor] = useState('');

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const data = await getAllQuotationsForComparison();
      setQuotations(data.quotations || []);
    } catch (error) {
      toast.error('Failed to load comparison data');
    } finally {
      setLoading(false);
    }
  };

  const filteredQuotations = filterVendor
    ? quotations.filter(q => q.vendor?._id === filterVendor || q.vendor?._id?.toString() === filterVendor)
    : quotations;

  const vendorOptions = [...new Set(quotations.map(q => q.vendor?._id?.toString()))]
    .filter(Boolean)
    .map(id => {
      const q = quotations.find(q => q.vendor?._id?.toString() === id);
      return q?.vendor;
    })
    .filter(Boolean);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quotation Comparison
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Compare quotations from different vendors and find the best value
        </p>
      </div>

      {filteredQuotations.length > 0 && (
        <BestQuoteHighlight quotations={filteredQuotations} />
      )}

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by Vendor:
        </label>
        <select
          value={filterVendor}
          onChange={(e) => setFilterVendor(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Vendors</option>
          {vendorOptions.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.vendorName} - {vendor.companyName}
            </option>
          ))}
        </select>
      </div>

      <ComparisonTable quotations={filteredQuotations} />
    </div>
  );
};

export default ComparisonPage;