import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const currentTime = Math.floor(Date.now() / 1000);
  if (loading) {
    return <Loading />
  }

  if (!user || !user.exp || user.exp <= currentTime) {
    return <Navigate to="/login" />;
  }


  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
