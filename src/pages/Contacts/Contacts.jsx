import styles from './Contacts.module.css';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelectors, contactsOperations } from 'redux/contacts';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(contactsSelectors.getIsLoading);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.section}>
      <div className={styles.box}>
        <div className={styles.box}>
          <h1>Phonebook</h1>
          <ContactForm />
        </div>

        <div className={styles.box}>
          <h3>Find contacts by name:</h3>
          <Filter />
        </div>

        <div className={styles.box}>
          {isLoading ? <h2>Loading... </h2> : <ContactList />}
        </div>
      </div>
    </div>
  );
};
