import axiosInstance from './axiosInstance';

export const getDashboardStats = async () => {
  const response = await axiosInstance.get('/dashboard/stats');
  return response.data;
};

export const getStatusDistribution = async () => {
  const response = await axiosInstance.get('/dashboard/status-distribution');
  return response.data;
};