import styles from './AppBar.module.css';
import { Navigation } from 'components/Navigation';
import { UserMenu } from 'components/UserMenu';
import { AuthNav } from 'components/AuthNav';
import { authSelectors } from 'redux/auth';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';

export const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Navbar bg="light">
      <Navbar.Brand>Contacts app</Navbar.Brand>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </Navbar>
  );
};
