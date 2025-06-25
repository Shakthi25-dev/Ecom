import axios from 'axios';

const ORDER_BASE = '/api/orders';

export const placeOrder = (order, token) =>
  axios.post(ORDER_BASE, order, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getUserOrders = (token) =>
  axios.get(ORDER_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateOrderStatus = (id, status, token) =>
  axios.put(`${ORDER_BASE}/${id}/status`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
