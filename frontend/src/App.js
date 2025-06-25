import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistory from './pages/OrderHistory';
import ArtisanDashboard from './pages/ArtisanDashboard';
import AdminDashboard from './pages/AdminDashboard';
import useAuth from './hooks/useAuth';
import { isAdmin, isArtisan } from './utils/roles';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route
            path="/artisan/dashboard"
            element={user && isArtisan(user) ? <ArtisanDashboard /> : <LoginPage />}
          />
          <Route
            path="/admin"
            element={user && isAdmin(user) ? <AdminDashboard /> : <LoginPage />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
