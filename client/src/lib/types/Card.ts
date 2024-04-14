export interface CardProps {
    id: string;
    title: string;
    description: string;
    state?: 'pre_flight' | 'in_flight' | 'post_flight';
    onDeleteMission: () => void;
    onMoveMission: (id: string, newState: string) => void;
}