import { useSelector, useDispatch } from 'react-redux';
import styles from './UserMenu.module.css';
import { authSelectors, authOperations } from 'redux/auth';
import { Nav, Container, Navbar, Button } from 'react-bootstrap';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  return (
    <Container className="justify-content-end">
      <Navbar.Text>Welcome, {name}</Navbar.Text>
      <Nav.Link
        as={Button}
        variant="outline-info"
        size="lg"
        className={styles.modal_button}
        onClick={() => dispatch(authOperations.logOut())}
      >
        Logout
      </Nav.Link>
    </Container>
  );
};
