import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', form, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { token, user } = res.data;
      loginUser({ token, user }); 
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        placeholder="Email"
        className="w-full p-2 mb-2 border"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        className="w-full p-2 mb-2 border"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}

export default LoginPage;
