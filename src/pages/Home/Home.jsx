import { Container } from 'react-bootstrap';
import styles from './Home.module.css';
import image from './logo-blue.png';

export const Home = () => (
  <Container className="d-flex flex-column  align-items-center my-3">
    <div>
      <h3>Welcome to my</h3>
    </div>
    <div>
      <h1>Contacts app</h1>
    </div>
    <div>
      <img src={image} alt="" className={styles.img} />
    </div>
  </Container>
);
