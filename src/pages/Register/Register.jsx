import styles from './Register.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { authOperations } from 'redux/auth';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(
        authOperations.register({ name, email, password })
      ).unwrap();
      setName('');
      setEmail('');
      setPassword('');
    } catch (e) {
      toast.error('Error occured');
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <div className={styles.box}>
        <div className={styles.box_name}>
          <label>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
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
