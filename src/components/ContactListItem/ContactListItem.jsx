import styles from './ContactListItem.module.css';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { contactsOperations } from 'redux/contacts';
import { useState } from 'react';

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
    <li key={id} className={styles.contactList_item}>
      <p>
        {name}: {number}
      </p>
      <button className={styles.button} onClick={() => handleDelete(id)}>
        {isDeleting ? 'Deleting..' : 'Delete'}
      </button>
    </li>
  );
};
