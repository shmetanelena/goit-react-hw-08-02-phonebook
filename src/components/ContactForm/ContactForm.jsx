import styles from './ContactForm.module.css';
import toast from 'react-hot-toast';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

export const ContactForm = ({ show, handleCLose }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);

  const initialValues = {
    name: '',
    number: '',
  };

  const schema = yup.object({
    name: yup
      .string()
      .required('Required field')
      .matches(
        "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
        'Invalid value'
      )
      .test((value, ctx) => {
        const normalizedName = value?.toLowerCase();
        if (
          contacts?.find(
            contact => contact.name.toLowerCase() === normalizedName
          )
        ) {
          return ctx.createError({
            message: `${value} is already in contacts.`,
          });
        }
        return true;
      }),
    number: yup
      .string()
      .required('Required field')
      .matches(
        /\+?\d{1,4}?[-.s]?\(?\d{1,3}?\)?[-.s]?\d{1,4}[-.s]?\d{1,4}[-.s]?\d{1,9}/,
        'Invalid value'
      ),
  });
  //background-color: #ececec;
  return (
    <Modal show={show} onHide={handleCLose} keyboard>
      <div style={{ backgroundColor: '#ececec' }}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async values => {
            console.log(values);
            if (values.name === '' || values.number === '') return;
            try {
              await dispatch(contactsOperations.addContact(values)).unwrap();
              toast.success('Contact created');
              handleCLose();
            } catch (e) {
              toast.error('Error occured');
            }
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Modal.Header closeButton style={{ backgroundColor: '#c3ddda' }}>
                <Modal.Title>New contact</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="contact-form-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter the name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contact-form-number">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="number"
                    placeholder="Enter the number"
                    value={values.number}
                    onChange={handleChange}
                    isValid={touched.number && !errors.number}
                    isInvalid={touched.number && errors.number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.number}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="outline-success"
                  className={styles.modal_button}
                  disabled={isSubmitting}
                >
                  Add
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={handleCLose}
                  className={styles.modal_button}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
