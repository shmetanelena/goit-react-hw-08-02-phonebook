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

  return (
    <Container className="cont">
      {isModal && <ContactForm handleCLose={() => setIsModal(false)} />}

      <Col className=" d-flex justify-content-end my-3">
        <Button variant="outline-success" onClick={() => setIsModal(true)}>
          Add contact
        </Button>
      </Col>
      <hr />
      <Filter />
      {isLoading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <ContactList />
      )}
    </Container>
  );
};
