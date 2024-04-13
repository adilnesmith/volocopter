import { FC, useState, useEffect } from 'react';
import styles from './Board.module.scss';
import Card from '../card';
import axios from 'axios';

interface Mission {
  id: number;
  title: string;
  description: string;
  state: string;
}

interface BoardProps {
  onAddMission: () => void;
  onDeleteMission: () => void;
}

const Board: FC<BoardProps> = ({ onAddMission, onDeleteMission }) => {
  const [preFlightMissions, setPreFlightMissions] = useState<Mission[]>([]);
  const [flightMissions, setFlightMissions] = useState<Mission[]>([]);
  const [postFlightMissions, setPostFlightMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/missions');
        const missions = response.data;

        setPreFlightMissions(missions.filter(mission => mission.state === 'pre_flight'));
        setFlightMissions(missions.filter(mission => mission.state === 'in_flight'));
        setPostFlightMissions(missions.filter(mission => mission.state === 'post_flight'));
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__columns__pre}>
        <label>pre-flight</label>
        {preFlightMissions.map(mission => (
          <Card
            key={mission.id}
            title={mission.title}
            description={mission.description}
            onAddMission={onAddMission}
            onDeleteMission={onDeleteMission}
          />
        ))}
      </div>
      <div className={styles.wrapper__columns__in}>
        <label>flight</label>
        {flightMissions.map(mission => (
          <Card
            key={mission.id}
            title={mission.title}
            description={mission.description}
            onAddMission={onAddMission}
            onDeleteMission={onDeleteMission}
          />
        ))}
      </div>
      <div className={styles.wrapper__columns__post}>
        <label>post-flight</label>
        {postFlightMissions.map(mission => (
          <Card
            key={mission.id}
            title={mission.title}
            description={mission.description}
            onAddMission={onAddMission}
            onDeleteMission={onDeleteMission}
          />
        ))}
      </div>
    </section>
  );
};

export default Board;
