import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptor to attach JWT token for admin endpoints
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract clean error message
    const message =
      error.response?.data?.message ||
      error.message ||
      'Network error. Please check your connection.';
    return Promise.reject(new Error(message));
  }
);

// Contact API Services
export const submitContact = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

// Admin API Services
export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const getAdminContacts = async (params = {}) => {
  const response = await api.get('/admin/contacts', { params });
  return response.data;
};

export const getAdminContactById = async (id) => {
  const response = await api.get(`/admin/contacts/${id}`);
  return response.data;
};

export const updateAdminContactStatus = async (id, isRead) => {
  const response = await api.patch(`/admin/contacts/${id}`, { isRead });
  return response.data;
};

export const deleteAdminContact = async (id) => {
  const response = await api.delete(`/admin/contacts/${id}`);
  return response.data;
};

export default api;
