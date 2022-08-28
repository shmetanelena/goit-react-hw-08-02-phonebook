import { NavLink } from 'react-router-dom';
import { Nav, Container } from 'react-bootstrap';

export const AuthNav = () => {
  return (
    <Container className="justify-content-end">
      <Nav>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/register">
            Register
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};
