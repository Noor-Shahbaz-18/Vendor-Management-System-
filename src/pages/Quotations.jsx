import React, { useState, useEffect } from 'react';
import { getQuotations, deleteQuotation } from '../api/quotationApi';
import { getVendors } from '../api/vendorApi';
import QuotationTable from '../components/quotation/QuotationTable';
import QuotationForm from '../components/quotation/QuotationForm';
import SearchFilter from '../components/common/SearchFilter';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [searchTerm, statusFilter]);

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
    }
  };

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const params = { search: searchTerm };
      if (statusFilter) params.status = statusFilter;
      const data = await getQuotations(params);
      setQuotations(data);
    } catch (error) {
      toast.error('Failed to fetch quotations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quotation?')) return;
    try {
      await deleteQuotation(id);
      toast.success('Quotation deleted successfully');
      fetchQuotations();
    } catch (error) {
      toast.error('Failed to delete quotation');
    }
  };

  const handleEdit = (quotation) => {
    setEditingQuotation(quotation);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingQuotation(null);
  };

  const handleSuccess = () => {
    fetchQuotations();
    handleModalClose();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quotations</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage all quotation requests</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus /> New Quotation
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search quotations..."
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="received">Received</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <QuotationTable
        quotations={quotations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingQuotation ? 'Edit Quotation' : 'Create New Quotation'}
        size="lg"
      >
        <QuotationForm
          quotation={editingQuotation}
          vendors={vendors}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default Quotations;