import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';
import toast from 'react-hot-toast';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';

export const ContactForm = ({ show, close }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [validated, setValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handelSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const isValid = form.checkValidity();
    setValidated(true);
    if (!isValid) {
      return;
    }

    const normalizedName = name.toLowerCase();
    if (
      contacts?.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      toast.error(`${name} is already in contacts.`);
      return;
    }
    try {
      setIsSaving(true);
      await dispatch(contactsOperations.addContact({ name, number })).unwrap();
      toast.success('Contact created');
      handleCLose();
    } catch (e) {
      toast.error('Error occured');
    }
    setIsSaving(false);
  };

  const handleCLose = () => {
    setName('');
    setNumber('');
    setValidated(false);
    close();
  };

  return (
    <Modal show={show} onHide={handleCLose} keyboard>
      <Form onSubmit={handelSubmit} noValidate validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>New contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="contact-form-name">
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
              and spaces. For example Adrian, Jacob Mercer, Charles de Batz de
              Castelmore d'Artagnan
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contact-form-number">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              placeholder="Enter the number"
              required
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Phone number is required and must be digits and can contain
              spaces, dashes, parentheses and can start with +
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="outline-success"
            className={styles.modal_button}
            disabled={isSaving}
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
    </Modal>
  );
};
