import { useSelector, useDispatch } from 'react-redux';
import { contactsActions, contactsSelectors } from 'redux/contacts';
import { Form, Container } from 'react-bootstrap';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(contactsSelectors.getFilter);

  return (
    <Container>
      <Form.Control
        type="text"
        placeholder="Filter"
        onChange={e =>
          dispatch(contactsActions.setFilter(e.currentTarget.value))
        }
        value={filter}
      />
    </Container>
  );
};
