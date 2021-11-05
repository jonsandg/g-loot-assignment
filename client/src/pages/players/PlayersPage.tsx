import React, { useState, useEffect, useRef } from 'react';

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

  const newPlayerNameInputRef = useRef<HTMLInputElement>()

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
        onCloseModal();
      });
  }

  const onCloseModal = () => {
    setModalIsOpen(false);
    setNewPlayerName('');
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
          icon="user-add"
          onClick={() => setModalIsOpen(true)}
        />
      </div>
      <div className={styles.listContainer}>
        <PlayerList players={filteredPlayers} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => onCloseModal()}
        title="Add New Player"
        actions={[
          <Button 
            color="green" 
            disabled={!newPlayerName}
            onClick={() => onNewPlayerSubmit()}
          >
            Add
          </Button>,
          <Button onClick={() => onCloseModal()}>Cancel</Button>
        ]}
      >
        <TextInput
          placeholder="Name"
          value={newPlayerName}
          onChange={e => setNewPlayerName(e.target.value)}
          ref={newPlayerNameInputRef}
          onMounted={() => newPlayerNameInputRef.current?.focus()}
        />
      </Modal>
    </div>
  );
}

export { PlayersPage };
