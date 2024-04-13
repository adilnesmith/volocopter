import { FC, useState } from 'react';
import styles from './Modal.module.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ModalProps {
    mode: 'add' | 'delete';
    title: string;
    onDelete?: () => void;
    onSave?: (title: string, description: string) => void;
    onCancel: () => void;
}

const Modal: FC<ModalProps> = ({ mode, title, onDelete, onSave, onCancel }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:8000/missions', {
                title: newTitle,
                description: newDescription,
                state: "pre_flight"
            });

            if (response.status === 201) {
                toast.success('Mission successfully created!');
                setNewTitle('');
                setNewDescription('');
                if (onSave) {
                    onSave(newTitle, newDescription);
                }
                onCancel();
            } else {
                // Handle other status codes if needed
            }
        } catch (error) {

            console.error('Error:', error);
            if (error.response) {

                if (error.response.status === 400) {
                    toast.error(error.response.data);
                } else {
                    toast.error('An error occurred while processing your request.');
                }
            } else if (error.request) {

                toast.error('No response received from the server.');
            } else {

                toast.error('An error occurred while processing your request.');
            }
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
