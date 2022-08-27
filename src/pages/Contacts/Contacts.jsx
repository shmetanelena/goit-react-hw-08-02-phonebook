import styles from './Contacts.module.css';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelectors, contactsOperations } from 'redux/contacts';
import { Container, Col, Button, Spinner } from 'react-bootstrap';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(contactsSelectors.getIsLoading);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  const handleCLoseModal = () => setIsModal(false);
  return (
    <Container>
      <ContactForm show={isModal} close={handleCLoseModal} />
      <Col className="d-flex justify-content-end my-3">
        <Button onClick={() => setIsModal(true)}>Add contact</Button>
      </Col>
      <hr />
      <Filter />
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <ContactList />
      )}
    </Container>
  );
};
