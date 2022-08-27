import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({
  children,
  redirectTo = '/',
  restricted = false,
}) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  if (shouldRedirect) {
    return <Navigate to={redirectTo} replace={true} />;
  }
  return children;
};
