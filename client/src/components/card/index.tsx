import React, { FC, useState } from 'react';
import styles from './Card.module.scss';
import Modal from '../modal';

interface CardProps {
  key: string;
  title: string;
  description: string;
  state?: 'pre_flight' | 'in_flight' | 'post_flight';
  onDeleteMission: () => void;
}

const Card: FC<CardProps> = ({ key, title, description, state, onDeleteMission }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getBorderColor = () => {
    switch (state) {
      case 'in_flight':
        return 'blue';
      case 'post_flight':
        return 'green';
      default:
        return 'brown'; // Default color
    }
  };

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
      <div className={styles.wrapper} style={{ borderColor: getBorderColor(), }}>
        <div className={styles.wrapper__head}>
          <h5>{title}</h5>
          <i onClick={handleDeleteClick}>X</i>
        </div>
        <hr />
        <p>{description}</p>
      </div>
      {showDeleteModal && (
        <Modal
          mode="delete"
          title={title}
          onDelete={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default Card;
