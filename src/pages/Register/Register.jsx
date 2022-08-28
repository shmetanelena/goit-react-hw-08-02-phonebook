import styles from './Register.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { authOperations } from 'redux/auth';
import { Button, Card, Form, Col, Nav } from 'react-bootstrap';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
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
      await dispatch(
        authOperations.register({ name, email, password })
      ).unwrap();
      setName('');
      setEmail('');
      setPassword('');
    } catch (e) {
      toast.error('Error occured');
    }
  };

  return (
    <Card className="mt-3">
      <Card.Header>Registration</Card.Header>
      <Card.Body>
        <Form onSubmit={handelSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="register-form-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              placeholder="Enter the name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Name is required and may contain only letters, apostrophe, dash
              and spaces.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="register-form-email">
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
          <Form.Group className="mb-3" controlId="register-form-password">
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
            <Button variant="outline-success" type="submit">
              Register
            </Button>
          </Col>
        </Form>
      </Card.Body>
    </Card>
  );
};
