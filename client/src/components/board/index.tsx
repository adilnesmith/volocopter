import { FC } from 'react';
import styles from './Board.module.scss';
import Card from '../card';

interface BoardProps {
  onAddMission: () => void;
  onDeleteMission: () => void;
}

const Board: FC<BoardProps> = ({ onAddMission, onDeleteMission }) => {
  const dummyDeleteMission = () => {
    console.log("Delete mission functionality is not implemented yet!");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__columns__pre}>
        <label>pre-flight</label>
        <Card onAddMission={onAddMission} onDeleteMission={dummyDeleteMission} />
      </div>
      <div className={styles.wrapper__columns__in}>
        <label>flight</label>
      </div>
      <div className={styles.wrapper__columns__post}>
        <label>post-flight</label>
      </div>
    </section>
  );
};

export default Board;
