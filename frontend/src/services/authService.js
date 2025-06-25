import axios from 'axios';

const AUTH_BASE = '/api/user';

export const login = (credentials) =>
  axios.post(`${AUTH_BASE}/login`, credentials, {
    headers: { 'Content-Type': 'application/json' },
  });

export const register = (data) =>
  axios.post(`${AUTH_BASE}/register`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
