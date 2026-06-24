import React, { useState, useEffect } from 'react';
import { getVendors, deleteVendor } from '../api/vendorApi';
import VendorTable from '../components/vendor/VendorTable';
import VendorForm from '../components/vendor/VendorForm';
import SearchFilter from '../components/common/SearchFilter';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, [searchTerm]);

  const fetchVendors = async () => {
    try {
      const data = await getVendors({ search: searchTerm });
      setVendors(data);
    } catch (error) {
      toast.error('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await deleteVendor(id);
      toast.success('Vendor deleted successfully');
      fetchVendors();
    } catch (error) {
      toast.error('Failed to delete vendor');
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingVendor(null);
  };

  const handleSuccess = () => {
    fetchVendors();
    handleModalClose();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendors</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your vendor database</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus /> Add Vendor
        </button>
      </div>

      <div className="max-w-md">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search vendors..."
        />
      </div>

      <VendorTable
        vendors={vendors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
      >
        <VendorForm
          vendor={editingVendor}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default Vendors;