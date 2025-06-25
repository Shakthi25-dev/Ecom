import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold">Desi Etsy</Link>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            {user.role === 'artisan' && <Link to="/artisan/dashboard">Dashboard</Link>}
            <Link to="/orders">Orders</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;