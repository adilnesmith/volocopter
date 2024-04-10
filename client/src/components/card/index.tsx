import { FC } from 'react';
import styles from './Card.module.scss';

const Card: FC<{}> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <h5>title</h5>
        <div>x</div>
      </div>
      <hr />
      <p>description</p>
    </div>
  );
};

export default Card;
