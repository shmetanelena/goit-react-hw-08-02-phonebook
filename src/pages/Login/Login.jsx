import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import toast from 'react-hot-toast';
import { Button, Card, Form, Col, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

export const Login = () => {
  const dispatch = useDispatch();
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="card">
        <Card.Header className="header">Log in</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={yup.object({
              email: yup
                .string()
                .email('Invalid email')
                .required('Required field'),
              password: yup.string().required('Required field'),
            })}
            onSubmit={async values => {
              try {
                await dispatch(authOperations.logIn(values)).unwrap();
              } catch (e) {
                toast.error('Wrong email or password');
              }
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="login-form-email">
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
                <Form.Group className="mb-3" controlId="login-form-password">
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
                    type="submit"
                    variant="outline-info"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Col>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};
