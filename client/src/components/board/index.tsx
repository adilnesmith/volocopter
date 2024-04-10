import { FC } from 'react';
import styles from './Board.module.scss';

const Board: FC<{}> = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__columns__pre}>
        <label>pre-flight</label>
      </div>
      <div className={styles.wrapper__columns__in}>
        <label>flight</label>
      </div>
      <div className={styles.wrapper__columns__post}>
        <label>post-flight</label>
      </div>
    </section>
  )
}

export default Board;
