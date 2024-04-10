import { FC, useState } from 'react';
import styles from './Card.module.scss';
import Modal from '../modal';

interface CardProps {
  onAddMission: () => void;
  onDeleteMission: () => void;
}

const Card: FC<CardProps> = ({ onAddMission, onDeleteMission }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteMission();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__head}>
          <h5>title</h5>
          <i onClick={handleDeleteClick}>X</i>
        </div>
        <hr />
        <p>description</p>
      </div>
      {showDeleteModal && (
        <Modal
          mode="delete"
          title="Mission Name"
          onDelete={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default Card;
