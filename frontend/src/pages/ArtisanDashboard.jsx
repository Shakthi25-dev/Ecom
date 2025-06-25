import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { getToken } from '../utils/token';

function ArtisanDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('/products', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const mine = res.data.filter(p => p.artisan && p.artisan._id === user._id);
        setProducts(mine);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }
    fetchProducts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Deletion failed.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Products</h2>
        <Link to="/artisan/create" className="bg-blue-500 text-white px-4 py-2 rounded">Add New</Link>
      </div>
      {products.map(prod => (
        <div key={prod._id} className="border p-2 mb-2">
          <h3 className="font-semibold">{prod.title}</h3> {/* ✅ Fixed field */}
          <p>Status: {prod.approved ? 'Approved' : 'Pending'}</p>
          <div className="flex gap-2 mt-2">
            <Link to={`/artisan/edit/${prod._id}`} className="text-blue-600">Edit</Link>
            <button onClick={() => handleDelete(prod._id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArtisanDashboard;
