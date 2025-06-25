import axios from 'axios';

const PRODUCT_BASE = '/api/products';

export const getAllProducts = () => axios.get(PRODUCT_BASE);

export const getProductById = (id) => axios.get(`/api/products/single/${id}`);
export const createProduct = (data, token) =>
  axios.post('/api/products/new', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const updateProduct = (id, data, token) =>
  axios.put(`${PRODUCT_BASE}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const deleteProduct = (id, token) =>
  axios.delete(`${PRODUCT_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
