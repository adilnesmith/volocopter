import { FC } from 'react';
import styles from './Copyright.module.scss';
const Footer: FC<{}> = () => {
  return (
    <div className={styles.wrapper}>
      &copy; 2024 Volocopter. All Rights Reserved
    </div>
  )
}
export default Footer;