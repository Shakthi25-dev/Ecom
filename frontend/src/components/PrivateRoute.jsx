import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;