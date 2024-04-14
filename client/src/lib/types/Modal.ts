export interface ModalProps {
    mode: 'add' | 'delete';
    title: string;
    onDelete?: () => void;
    onSave?: (title: string, description: string) => void;
    onCancel: () => void;
}