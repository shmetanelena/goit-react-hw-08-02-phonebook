import styles from './Register.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { authOperations } from 'redux/auth';
import { Button, Card, Form, Col, Nav } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

export const Register = () => {
  const dispatch = useDispatch();

  return (
    <Card className="mt-3">
      <Card.Header>Registration</Card.Header>
      <Card.Body>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={yup.object({
            name: yup
              .string()
              .required('Required field')
              .matches(
                "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
                'Invalid value'
              ),
            email: yup
              .string()
              .email('Invalid email')
              .required('Required field'),
            password: yup.string().required('Required field'),
          })}
          onSubmit={async values => {
            try {
              await dispatch(authOperations.register(values)).unwrap();
            } catch (e) {
              toast.error('Error occured');
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="register-form-name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter the name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                  isValid={touched.name && !errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="register-form-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter the email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="register-form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter the password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                  isValid={touched.password && !errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="outline-success"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};
