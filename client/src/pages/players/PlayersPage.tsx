import React, { useState, useEffect } from 'react';

import styles from './PlayersPage.module.scss';

import { PlayerList } from 'components/PlayerList';
import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { Modal } from 'components/Modal';
import { Header } from 'components/Header';

import { getAllPlayers, addPlayer } from 'api';

const PlayersPage = () => {

  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [filterQuery, setFilterquery] = useState('');
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    getAllPlayers()
      .then(data => {
        setPlayers(data);
      })
  }, []);

  const onNewPlayerSubmit = () => {
    if (!newPlayerName) {
      return;
    }
    return addPlayer(newPlayerName)
      .then(player => {
        setPlayers([player, ...players]);
        setModalIsOpen(false);
      });
  }

  const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(filterQuery.toLowerCase()));

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          value={filterQuery}
          onChange={e => setFilterquery(e.target.value)}
        />
        <Button
          color="green"
          icon="add-r"
          onClick={() => setModalIsOpen(true)}
        />
      </div>
      <div className={styles.listContainer}>
        <PlayerList players={filteredPlayers} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        title="Add New Player"
        actions={[
          <Button 
            color="green" 
            disabled={!newPlayerName}
            onClick={() => onNewPlayerSubmit()}
          >
            Add
          </Button>,
          <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
        ]}
      >
        <TextInput
          placeholder="Name"
          value={newPlayerName}
          onChange={e => setNewPlayerName(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export { PlayersPage };
