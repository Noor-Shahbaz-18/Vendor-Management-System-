import React, { useState, useEffect } from 'react';
import { createVendor, updateVendor } from '../../api/vendorApi';
import toast from 'react-hot-toast';

const VendorForm = ({ vendor, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    vendorName: '',
    companyName: '',
    email: '',
    contactNumber: '',
    businessAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vendor) {
      setFormData({
        vendorName: vendor.vendorName || '',
        companyName: vendor.companyName || '',
        email: vendor.email || '',
        contactNumber: vendor.contactNumber || '',
        businessAddress: vendor.businessAddress || '',
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.vendorName.trim()) newErrors.vendorName = 'Vendor name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business address is required';
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
      if (vendor) {
        await updateVendor(vendor._id, formData);
        toast.success('Vendor updated successfully');
      } else {
        await createVendor(formData);
        toast.success('Vendor created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save vendor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Vendor Name *
        </label>
        <input
          type="text"
          name="vendorName"
          value={formData.vendorName}
          onChange={handleChange}
          className={`input-field ${errors.vendorName ? 'border-red-500' : ''}`}
        />
        {errors.vendorName && (
          <p className="text-red-500 text-sm mt-1">{errors.vendorName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Company Name *
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`input-field ${errors.companyName ? 'border-red-500' : ''}`}
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contact Number *
        </label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className={`input-field ${errors.contactNumber ? 'border-red-500' : ''}`}
        />
        {errors.contactNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Business Address *
        </label>
        <textarea
          name="businessAddress"
          value={formData.businessAddress}
          onChange={handleChange}
          rows="3"
          className={`input-field ${errors.businessAddress ? 'border-red-500' : ''}`}
        />
        {errors.businessAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.businessAddress}</p>
        )}
      </div>

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
          {loading ? 'Saving...' : (vendor ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default VendorForm;