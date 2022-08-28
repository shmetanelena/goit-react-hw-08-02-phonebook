import { Navigation } from 'components/Navigation';
import { UserMenu } from 'components/UserMenu';
import { AuthNav } from 'components/AuthNav';
import { authSelectors } from 'redux/auth';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import image from './logo-blue.png';
import { NavLink } from 'react-router-dom';
import styles from './AppBar.module.css';

export const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Navbar className="header d-flex justify-content-center">
      <div className="mx-2">
        <Navbar.Brand as={NavLink} to="/">
          <img alt="" src={image} className={styles.img} /> Contacts app
        </Navbar.Brand>
      </div>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </Navbar>
  );
};
