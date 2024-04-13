import { FC } from 'react';
import styles from './Copyright.module.scss';

const Footer: FC<{}> = () => {
  return (
    <footer className={styles.wrapper}>
      &copy; 2024 Volocopter. All Rights Reserved
    </footer>
  )
}

export default Footer;
