import React, { useState, useEffect } from 'react';
import styles from './PlayersPage.module.scss';

import logo from 'images/gloot-logo.png';

import { PlayerList } from 'components/PlayerList';
import { Button } from 'components/Button';

import { getAllPlayers } from 'api';


const PlayersPage = () => {

  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [filterQuery, setFilterquery] = useState('');

  useEffect(() => {
    getAllPlayers()
      .then(data => {
        setPlayers(data);
      })
  }, []);

  const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(filterQuery.toLowerCase()));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="G-Loot logo" />
        <h1>
          G-Loot Player Directory
        </h1>
      </div>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={filterQuery}
          onChange={e => setFilterquery(e.target.value)}
        />
        <Button color="green" icon="add" />
      </div>
      <div className={styles.listContainer}>
        <PlayerList players={filteredPlayers} />
      </div>
    </div>
  );
}

export { PlayersPage };
