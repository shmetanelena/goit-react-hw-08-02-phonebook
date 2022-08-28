import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { contactsOperations } from 'redux/contacts';
import { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await dispatch(contactsOperations.deleteContact(id)).unwrap();
      toast.success('Contact has deleted');
    } catch (e) {
      toast.error('Error occured');
    }
    setIsDeleting(false);
  };

  return (
    <Card key={id} className="mt-2">
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>{number}</Card.Subtitle>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Col className="d-flex justify-content-end">
          <Button variant="outline-warning" onClick={handleDelete}>
            {isDeleting ? 'Deleting..' : 'Delete'}
          </Button>
        </Col>
      </Card.Footer>
    </Card>
  );
};
