import { Navigation } from 'components/Navigation';
import { UserMenu } from 'components/UserMenu';
import { AuthNav } from 'components/AuthNav';
import { authSelectors } from 'redux/auth';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import image from './logo-blue.png';
import styles from './AppBar.module.css';

export const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Navbar className={styles.menu}>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={image}
          width="60"
          height="50"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <Navbar.Brand>Contacts app</Navbar.Brand>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </Navbar>
  );
};
