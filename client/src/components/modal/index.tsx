import { FC, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ModalProps } from '../../lib/types/Modal';
import { ENDPOINTS } from '../../lib/api';
import { API_DOMAIN } from '../../lib/general-config';
import styles from './Modal.module.scss';

const Modal: FC<ModalProps> = ({ mode, title, onDelete, onSave, onCancel }) => {
    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');

    const handleSave = async () => {
        try {
            const response = await axios.post(
                `${API_DOMAIN}${ENDPOINTS.POST.createMission()}`,
                {
                    title: newTitle,
                    description: newDescription,
                    state: "pre_flight"
                }
            );

            if (response.status === 201) {
                toast.success('Mission successfully created!');
                setNewTitle('');
                setNewDescription('');
                onSave && onSave(newTitle, newDescription);
                onCancel();
            } else {
                // Handle other status codes if needed
            }
        } catch (error) {
            console.error('Error:', error);
            handleError(error);
        }
    };

    const handleError = (error: any) => {
        if (error.response) {
            handleResponseError(error);
        } else if (error.request) {
            toast.error('No response received from the server.');
        } else {
            toast.error('An error occurred while processing your request.');
        }
    };

    const handleResponseError = (error: any) => {
        if (error.response.status === 400) {
            toast.error(error.response.data);
        } else {
            toast.error('An error occurred while processing your request.');
        }
    };

    const handleDelete = () => {
        onDelete && onDelete();
    };

    const handleCancel = () => {
        onCancel && onCancel();
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
