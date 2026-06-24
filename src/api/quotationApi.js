import axiosInstance from './axiosInstance';

export const getQuotations = async (params) => {
  const response = await axiosInstance.get('/quotations', { params });
  return response.data;
};

export const getQuotation = async (id) => {
  const response = await axiosInstance.get(`/quotations/${id}`);
  return response.data;
};

export const createQuotation = async (data) => {
  const response = await axiosInstance.post('/quotations', data);
  return response.data;
};

export const updateQuotation = async (id, data) => {
  const response = await axiosInstance.put(`/quotations/${id}`, data);
  return response.data;
};

export const deleteQuotation = async (id) => {
  const response = await axiosInstance.delete(`/quotations/${id}`);
  return response.data;
};

export const updateQuotationStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/quotations/${id}/status`, { status });
  return response.data;
};