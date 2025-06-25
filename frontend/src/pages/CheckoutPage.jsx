import { useState } from 'react';
import axios from 'axios';
import useCart from '../hooks/useCart';
import { getToken } from '../utils/token';

function CheckoutPage() {
  const { clearCart } = useCart();
  const [address, setAddress] = useState('');

  const handleCheckout = async () => {
    if (!address.trim()) {
      alert('Please enter a shipping address.');
      return;
    }

    try {
      // Note: Backend places order using items from DB cart
      await axios.post('/orders', {}, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      clearCart(); 
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Order placement failed:', err);
      alert('Checkout failed. Try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <textarea
        className="w-full border p-2 mb-4"
        rows="4"
        placeholder="Enter shipping address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>
      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white px-4 py-2"
      >
        Pay with Razorpay
      </button>
    </div>
  );
}

export default CheckoutPage;
