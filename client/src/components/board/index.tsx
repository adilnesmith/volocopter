import { FC, useState, useEffect, useRef } from 'react';
import styles from './Board.module.scss';
import Card from '../card';
import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';
import { BoardProps, Mission } from '../../lib/types/Board';
import { ENDPOINTS } from '../../lib/api';
import { API_DOMAIN } from '../../lib/general-config';


const Board: FC<BoardProps> = ({ onAddMission, onDeleteMission }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cancelTokenSourceRef = useRef<CancelTokenSource>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        cancelTokenSourceRef.current = axios.CancelToken.source();
        const response = await axios.get(`${API_DOMAIN}${ENDPOINTS.GET.missions}`, {
          cancelToken: cancelTokenSourceRef.current.token,
        });
        setMissions(response.data);
        setLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching missions:', error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel('Component unmounted');
      }
    };
  }, [onAddMission, onDeleteMission]);
  const handleDeleteMission = async (id: string) => {
    if (!id) {
      console.error('Invalid mission ID:', id);
      return;
    }

    try {
      await axios.delete(`${API_DOMAIN}${ENDPOINTS.DELETE.mission(id)}`);
      setMissions(missions.filter(mission => mission._id !== id));
      toast.success('Mission deleted successfully!');
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, newState: string) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, newState: string) => {
    event.preventDefault();
    const missionId = event.dataTransfer.getData('text/plain');
    handleMoveMission(missionId, newState);
  };

  const handleMoveMission = async (missionId: string, newState: string) => {
    try {
      const existingMission = missions.find(mission => mission._id === missionId);
      if (!existingMission || existingMission.state === newState) {
        return;
      }
      const updatedMissions = missions.map(mission =>
        mission._id === missionId ? { ...mission, state: newState } : mission
      );
      setMissions(updatedMissions);
      await axios.put(`${API_DOMAIN}${ENDPOINTS.PUT.mission(missionId, newState)}`);
      toast.success('Mission moved successfully!');
    } catch (error) {
      console.error('Error moving mission:', error);
    }
  };
  const renderColumn = (state: string) => {
    const filteredMissions = missions.filter(mission => mission.state === state);
    const missionCount = filteredMissions.length;
    if (missionCount === 0) {
      return (
        <div
          className={styles.wrapper__columns}
          onDragOver={(event) => handleDragOver(event, state)}
          onDrop={(event) => handleDrop(event, state)}
        >
          <label>{state.replace('_', '-')} (0)</label>
        </div>
      );
    }
    return (
      <div
        className={styles.wrapper__columns}
        onDragOver={(event) => handleDragOver(event, state)}
        onDrop={(event) => handleDrop(event, state)}
      >
        <label>{state.replace('_', '-')} ({missionCount})</label>
        {filteredMissions.map(mission => (
          <Card
            key={mission._id}
            id={mission._id}
            title={mission.title}
            description={mission.description}
            state={mission.state}
            onDeleteMission={() => handleDeleteMission(mission._id)}
            onMoveMission={handleMoveMission}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.wrapper}>
      {renderColumn('pre_flight')}
      {renderColumn('in_flight')}
      {renderColumn('post_flight')}
    </section>
  );
};

export default Board;
