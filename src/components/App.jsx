import { Toaster } from 'react-hot-toast';
// import { Container } from './Container';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { Contacts } from 'pages/Contacts';
import { AppBar } from './AppBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Container } from 'react-bootstrap';

export const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser
  );
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    <Container fluid>
      {isFetchingCurrentUser ? (
        <h1>Loading user ...</h1>
      ) : (
        <>
          <AppBar />
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute redirectTo="/contacts" restricted>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute redirectTo="/contacts" restricted>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      <Toaster />
    </Container>
  );
};
