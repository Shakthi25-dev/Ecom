import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/register', form); 
      navigate('/verify'); 
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      alert('Registration failed. Please check the input or try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input placeholder="Name" className="w-full p-2 mb-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" className="w-full p-2 mb-2 border" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" className="w-full p-2 mb-2 border" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <select className="w-full p-2 mb-4 border" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="buyer">Buyer</option>
        <option value="artisan">Artisan</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}

export default RegisterPage;
