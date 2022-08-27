import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace={true} />;
  }
  return children;
};
