import styles from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { contactsActions, contactsSelectors } from 'redux/contacts';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(contactsSelectors.getFilter);

  return (
    <div className={styles.box}>
      <input
        type="text"
        className={styles.input}
        onChange={e =>
          dispatch(contactsActions.setFilter(e.currentTarget.value))
        }
        value={filter}
      />
    </div>
  );
};
