import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';
import toast from 'react-hot-toast';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { useSelector, useDispatch } from 'react-redux';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputId = useRef();
  const numberInputId = useRef();

  useEffect(() => {
    nameInputId.current = nanoid();
    numberInputId.current = nanoid();
  }, []);

  const handelSubmit = async e => {
    e.preventDefault();
    const normalizedName = name.toLowerCase();
    if (
      contacts?.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    try {
      await dispatch(contactsOperations.addContact({ name, number })).unwrap();
      setName('');
      setNumber('');
      toast.success('Contact created');
    } catch (e) {
      toast.error('Error occured');
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <div className={styles.box}>
        <div className={styles.box_name}>
          <label htmlFor={nameInputId.current}>
            Name
            <input
              className={styles.input_name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              id={nameInputId.current}
            />
          </label>

          <label htmlFor={numberInputId.current}>
            Number
            <input
              className={styles.input_number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={e => setNumber(e.target.value)}
              id={numberInputId.current}
            />
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </div>
    </form>
  );
};
