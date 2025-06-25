import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <aside className="w-64 p-4 bg-gray-100 h-full shadow-md">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/admin" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/admin/artisans" className="hover:text-blue-600">Verify Artisans</Link>
        <Link to="/admin/products" className="hover:text-blue-600">Approve Products</Link>
        <Link to="/admin/orders" className="hover:text-blue-600">All Orders</Link>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
