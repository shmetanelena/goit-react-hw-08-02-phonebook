import { Container } from 'react-bootstrap';
import image from './not-found-img.png';
import styles from './NotFound.module.css';

export const NotFound = () => (
  <Container className="d-flex flex-column align-items-center my-5">
    <div>
      <h2>Page not found (404)</h2>
    </div>
    <div>
      <img src={image} alt="" className={styles.img}></img>
    </div>
  </Container>
);
