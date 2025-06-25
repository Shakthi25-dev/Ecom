import axios from 'axios';

const ADMIN_BASE = '/api/admin';

export const getPendingArtisans = (token) =>
  axios.get(`${ADMIN_BASE}/artisans/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const verifyArtisan = (id, token) =>
  axios.put(`${ADMIN_BASE}/artisans/${id}/verify`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPendingProducts = (token) =>
  axios.get(`${ADMIN_BASE}/products/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const approveProduct = (id, token) =>
  axios.put(`${ADMIN_BASE}/products/${id}/approve`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const rejectProduct = (id, token) =>
  axios.put(`${ADMIN_BASE}/products/${id}/reject`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
