export interface Mission {
    _id: string;
    title: string;
    description: string;
    state: string;
}

export interface BoardProps {
    onAddMission: () => void;
    onDeleteMission: (id: string) => void;
}