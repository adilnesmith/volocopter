import { FC } from 'react';
import { HEADER_TEXT, CTA } from '../../../lib/constants/Header';
import styles from './Header.module.scss';
import { HeaderProps } from '../../../lib/types/Header';


const Header: FC<HeaderProps> = ({ onAddMission }) => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.wrapper__columns__text}>
        {HEADER_TEXT}
      </div>
      <div className={styles.wrapper__columns__cta}>
        <button onClick={onAddMission}>{CTA.title}</button>
      </div>
    </header>
  );
};

export default Header;
