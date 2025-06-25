import { Link } from 'react-router-dom';

function ArtisanSidebar() {
  return (
    <aside className="w-64 p-4 bg-gray-50 h-full shadow-md">
      <h2 className="text-xl font-bold mb-4">Artisan Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/artisan/dashboard" className="hover:text-green-600">My Products</Link>
        <Link to="/artisan/create" className="hover:text-green-600">Add New Product</Link>
        <Link to="/orders" className="hover:text-green-600">Order History</Link>
      </nav>
    </aside>
  );
}

export default ArtisanSidebar;
