import React, { useState, useEffect } from 'react';
import styles from './PlayersPage.module.scss';
import logo from 'images/gloot-logo.png';

import { getAllPlayers } from 'api';
import { PlayerList } from 'components/PlayerList';

const PlayersPage = () => {

  const [players, setPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    getAllPlayers()
      .then(data => {
        setPlayers(data);
      })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} />
        <h1>
          G-Loot Player Directory
        </h1>
      </div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." />
        <button>+</button>
      </div>
      <div className={styles.listContainer}>
        <PlayerList players={players} />
      </div>
    </div>
  );
}

export { PlayersPage };
