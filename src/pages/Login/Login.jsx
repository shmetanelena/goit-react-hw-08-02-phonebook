import styles from './Login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import toast from 'react-hot-toast';
import { Button, Card, Form, Col, Nav } from 'react-bootstrap';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handelSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const isValid = form.checkValidity();
    setValidated(true);
    if (!isValid) {
      return;
    }
    try {
      await dispatch(authOperations.logIn({ email, password })).unwrap();
      setEmail('');
      setPassword('');
    } catch (e) {
      toast.error('Wrong email or password');
    }
  };

  return (
    <Card className="mt-3">
      <Card.Header>Log in</Card.Header>
      <Card.Body>
        <Form onSubmit={handelSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="login-form-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter the email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Email is required and must be a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="login-form-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter the password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </Form.Group>
          <Col className="d-flex justify-content-center">
            <Button type="submit">Login</Button>
          </Col>
        </Form>
      </Card.Body>
      {/* <Card.Footer>
        <Col className="d-flex justify-content-end">
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
        </Col>
      </Card.Footer> */}
    </Card>
  );
};
