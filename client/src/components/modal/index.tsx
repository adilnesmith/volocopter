import { FC, useState } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    mode: 'add' | 'delete'; // Mode to determine the purpose of the modal
    title: string;
    onDelete?: () => void; // onDelete function for deleting mission
    onSave?: (title: string, description: string) => void; // onSave function for adding mission
    onCancel: () => void;
}

const Modal: FC<ModalProps> = ({ mode, title, onDelete, onSave, onCancel }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleSave = () => {
        if (onSave) {
            onSave(newTitle, newDescription);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{mode === 'delete' ? 'Delete Mission' : 'Add Mission'}</h2>
                {mode === 'delete' ? (
                    <p>Are you sure you want to delete the mission "{title}"?</p>
                ) : (
                    <>
                        <label>Title:</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <label>Description:</label>
                        <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    </>
                )}
                <div className={styles.buttonContainer}>
                    {mode === 'delete' ? (
                        <button onClick={handleDelete}>Delete</button>
                    ) : (
                        <button onClick={handleSave}>Save</button>
                    )}
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
