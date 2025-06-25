import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get('/orders/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="mb-4 border-b pb-2">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <ul className="text-sm list-disc pl-5">
              {order.items.map(item => (
                <li key={item.product?._id}>{item.product?.title}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
