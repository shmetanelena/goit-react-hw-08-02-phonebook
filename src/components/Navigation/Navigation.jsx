import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { Nav } from 'react-bootstrap';

export const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Nav>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      {isLoggedIn && (
        <Nav.Item>
          <Nav.Link as={NavLink} to="/contacts">
            Contacts
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};
