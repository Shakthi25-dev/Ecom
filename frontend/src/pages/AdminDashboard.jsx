import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/token';

function AdminDashboard() {
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [a, p] = await Promise.all([
          axios.get('/admin/artisans/pending', {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
          axios.get('/admin/products/pending', {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
        ]);
        setArtisans(a.data.artisans); // assume response { artisans: [...] }
        setProducts(p.data.products); // assume response { products: [...] }
      } catch (err) {
        console.error('Admin fetch failed:', err);
      }
    }
    fetchData();
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.put(`/admin/artisans/${id}/verify`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setArtisans(artisans.filter(a => a._id !== id));
    } catch (err) {
      console.error('Artisan verification failed:', err);
    }
  };

  const handleApproval = async (id, approve) => {
    const url = approve
      ? `/admin/products/${id}/approve`
      : `/admin/products/${id}/reject`;

    try {
      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Product moderation failed:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-6">
        <h3 className="font-semibold">Pending Artisans</h3>
        {artisans.map(artisan => (
          <div key={artisan._id} className="border p-2 my-2 flex justify-between">
            <span>{artisan.name} ({artisan.email})</span>
            <button
              onClick={() => handleVerify(artisan._id)}
              className="bg-green-500 text-white px-2"
            >
              Verify
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold">Pending Products</h3>
        {products.map(product => (
          <div key={product._id} className="border p-2 my-2">
            <h4>{product.title}</h4> {/* ✅ fixed */}
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleApproval(product._id, true)}
                className="bg-blue-500 text-white px-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval(product._id, false)}
                className="bg-red-500 text-white px-2"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
