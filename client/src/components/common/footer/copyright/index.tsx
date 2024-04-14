import { FC } from 'react';
import styles from './Copyright.module.scss';
import { FOOTER_TEXT } from '../../../../lib/constants/Footer';
const Footer: FC = () => {
  return (
    <footer className={styles.wrapper}>
      &copy; {FOOTER_TEXT}
    </footer>
  )
}

export default Footer;
