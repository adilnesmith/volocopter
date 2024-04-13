import React, { FC, useState } from 'react';
import styles from './Card.module.scss';
import Modal from '../modal';

interface CardProps {
  id: string;
  title: string;
  description: string;
  state?: 'pre_flight' | 'in_flight' | 'post_flight';
  onDeleteMission: () => void;
  onMoveMission: (id: string, newState: string) => void;
}

const Card: FC<CardProps> = ({ id, title, description, state, onDeleteMission, onMoveMission }) => {
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
