import { useSelector, useDispatch } from 'react-redux';
import styles from './UserMenu.module.css';
import { authSelectors, authOperations } from 'redux/auth';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  return (
    <div className={styles.container}>
      <span className={styles.name}>Welcome, {name} </span>
      <button
        type="button"
        className={styles.button}
        onClick={() => dispatch(authOperations.logOut())}
      >
        Logout
      </button>
    </div>
  );
};
