import React, { FC, useState } from 'react';
import styles from './Card.module.scss';
import Modal from '../modal';

import { CardProps } from '../../lib/types/Card';

const Card: FC<CardProps> = ({ id, title, description, state, onDeleteMission, onMoveMission }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getBorderColor = () => {
    switch (state) {
      case 'in_flight':
        return '#467aff';
      case 'post_flight':
        return '#49ce80';
      default:
        return '#fa902c'; // Default color
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

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, newState: string) => {
    event.preventDefault();
    const missionId = event.dataTransfer.getData('text/plain');
    onMoveMission(missionId, newState);
  };

  return (
    <>
      <div
        className={styles.wrapper}
        style={{ borderColor: getBorderColor() }}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, state || '')}
      >
        <div className={styles.wrapper__head}>
          <h5>{title}</h5>
          <span onClick={handleDeleteClick}>x</span>
        </div>
        <hr className={styles.wrapper__divider} />
        <p className={styles.wrapper__description}>{description}</p>
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
