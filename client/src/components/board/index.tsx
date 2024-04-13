import { FC, useState, useEffect, useRef } from 'react';
import styles from './Board.module.scss';
import Card from '../card';
import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';
interface Mission {
  _id: string;
  title: string;
  description: string;
  state: string;
}

interface BoardProps {
  onAddMission: () => void;
  onDeleteMission: (id: string) => void;
}

const Board: FC<BoardProps> = ({ onAddMission, onDeleteMission }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cancelTokenSourceRef = useRef<CancelTokenSource>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        cancelTokenSourceRef.current = axios.CancelToken.source();
        const response = await axios.get('http://localhost:8000/missions', {
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
      await axios.delete(`http://localhost:8000/missions?id=${id}`);
      setMissions(missions.filter(mission => mission._id !== id));
      toast.success('Mission deleted successfully!');
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };


  const renderColumn = (state: string) => {
    const filteredMissions = missions.filter(mission => mission.state === state);
    if (filteredMissions.length === 0) return null;
    return (
      <div className={styles.wrapper__columns}>
        <label>{state.replace('_', '-')}</label>
        {filteredMissions.map(mission => (
          <Card
            key={mission._id}
            title={mission.title}
            description={mission.description}
            state={mission.state}
            onDeleteMission={() => handleDeleteMission(mission._id)}
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
