import styles from './Login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import toast from 'react-hot-toast';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(authOperations.logIn({ email, password })).unwrap();
      setEmail('');
      setPassword('');
    } catch (e) {
      toast.error('Wrong email or password');
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <div className={styles.box}>
        <div className={styles.box_name}>
          <label>
            Email
            <input
              className={styles.input}
              type="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              className={styles.input}
              type="password"
              name="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Lpg in
        </button>
      </div>
    </form>
  );
};
