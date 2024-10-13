import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Component {...rest} />;
};

export default ProtectedRoute;
