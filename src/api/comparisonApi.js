import axiosInstance from './axiosInstance';

export const getAllQuotationsForComparison = async () => {
  const response = await axiosInstance.get('/comparison/all');
  return response.data;
};

export const compareVendorQuotations = async (vendorId) => {
  const response = await axiosInstance.get(`/comparison/vendor/${vendorId}`);
  return response.data;
};