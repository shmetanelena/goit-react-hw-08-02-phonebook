import styles from './AuthNav.module.css';
import { NavLink } from 'react-router-dom';

export const AuthNav = () => {
  return (
    <nav>
      <NavLink
        to="/login"
        className={styles.link}
        //activeClassName={styles.activeLink}
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={styles.link}
        //activeClassName={styles.activeLink}
      >
        Register
      </NavLink>
    </nav>
  );
};
