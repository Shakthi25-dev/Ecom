import useCart from '../hooks/useCart';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item._id} className="mb-4 border-b pb-4 flex items-center gap-4">
                <img
                  src={`/uploads/${item.product?.image}`}
                  alt={item.product?.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span>{item.product?.title || 'Unnamed Product'} x {item.quantity || 1}</span>
                    <span>₹{(item.product?.price || 0) * (item.quantity || 1)}</span>
                  </div>
                  <button
                    className="text-red-500 text-sm mt-1"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="font-semibold">Total: ₹{total}</p>
            <Link
              to="/checkout"
              className="bg-blue-500 text-white px-4 py-2 inline-block mt-2"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
