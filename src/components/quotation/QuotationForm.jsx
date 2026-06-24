import React, { useState, useEffect } from 'react';
import { createQuotation, updateQuotation } from '../../api/quotationApi';
import toast from 'react-hot-toast';

const QuotationForm = ({ quotation, vendors, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vendor: '',
    vendorReference: '',
    quotationAmount: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (quotation) {
      setFormData({
        title: quotation.title || '',
        description: quotation.description || '',
        vendor: quotation.vendor?._id || quotation.vendor || '',
        vendorReference: quotation.vendorReference || '',
        quotationAmount: quotation.quotationAmount || '',
        status: quotation.status || 'pending',
      });
    }
  }, [quotation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.vendor) newErrors.vendor = 'Vendor is required';
    if (!formData.quotationAmount) {
      newErrors.quotationAmount = 'Amount is required';
    } else if (isNaN(formData.quotationAmount) || parseFloat(formData.quotationAmount) <= 0) {
      newErrors.quotationAmount = 'Amount must be a positive number';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = {
        ...formData,
        quotationAmount: parseFloat(formData.quotationAmount),
      };
      
      if (quotation) {
        await updateQuotation(quotation._id, data);
        toast.success('Quotation updated successfully');
      } else {
        await createQuotation(data);
        toast.success('Quotation created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save quotation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`input-field ${errors.title ? 'border-red-500' : ''}`}
          placeholder="e.g., Office Supplies Quotation"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className={`input-field ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Detailed description of the quotation request"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Vendor *
        </label>
        <select
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          className={`input-field ${errors.vendor ? 'border-red-500' : ''}`}
        >
          <option value="">Select a vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.vendorName} - {vendor.companyName}
            </option>
          ))}
        </select>
        {errors.vendor && <p className="text-red-500 text-sm mt-1">{errors.vendor}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Vendor Reference
        </label>
        <input
          type="text"
          name="vendorReference"
          value={formData.vendorReference}
          onChange={handleChange}
          className="input-field"
          placeholder="Vendor's reference number (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Quotation Amount ($) *
        </label>
        <input
          type="number"
          name="quotationAmount"
          value={formData.quotationAmount}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={`input-field ${errors.quotationAmount ? 'border-red-500' : ''}`}
          placeholder="0.00"
        />
        {errors.quotationAmount && <p className="text-red-500 text-sm mt-1">{errors.quotationAmount}</p>}
      </div>

      {quotation && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="pending">Pending</option>
            <option value="received">Received</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : (quotation ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default QuotationForm;