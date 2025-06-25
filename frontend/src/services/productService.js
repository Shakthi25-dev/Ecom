import axios from 'axios';

const PRODUCT_BASE = '/api/products';

// GET all products
export const getAllProducts = () => axios.get(PRODUCT_BASE);

// GET single product
export const getProductById = (id) => axios.get(`/api/products/single/${id}`);

// CREATE product with file upload
export const createProduct = (data, token) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });

  return axios.post(`${PRODUCT_BASE}/new`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// UPDATE product with file upload
export const updateProduct = (id, data, token) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return axios.put(`${PRODUCT_BASE}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// DELETE product
export const deleteProduct = (id, token) =>
  axios.delete(`${PRODUCT_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
