import React from 'react';
import styles from './PlayerList.module.scss';
import { Link } from 'react-router-dom';

interface PlayerListProps {
  players: PlayerData[];
}

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {players.map(player => (
          <PlayerListItem key={player.id} data={player} />
        ))}
      </ul>
    </div>
  );
}

interface PlayerListItemProps {
  data: PlayerData;
}

export const PlayerListItem = ({ data }: PlayerListItemProps) => {
  return (
    <Link to={`/player/${data.id}`}>
      <li className={styles.item}>
          <img src={data.image} />
        
        <span>
          {data.name}
        </span>
      </li>
    </Link>
  );
}