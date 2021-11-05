import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import styles from './PlayerPage.module.scss';
import { getPlayer, deletePlayer, updatePlayer } from 'api';

import { Header } from 'components/Header';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { TextInput } from 'components/TextInput';

type RouteParams = {
  id: string;
} 

const PlayerPage = () => {

  const [player, setPlayer] = useState<PlayerData>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);

  const { id } = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    getPlayer(id)
    .then(player => setPlayer(player))
  }, [id]);

  const onDeletePlayerSubmit = () => {
    if (!player) {
      return;
    }
    return deletePlayer(player.id)
      .then(() => {
        setModalIsOpen(false);
        history.push('/');
      });
  }

  const startEditName = () => {
    if (!player) {
      return;
    }
    setNewName(player.name);
    setEditingName(true);
  }

  const onCancelEditName = () => {
    setNewName('');
    setEditingName(false);
  }

  const onNewNameSubmit = () => {
    if(!player || !newName) {
      return;
    }
    updatePlayer(player.id, newName)
    .then(player => {
      setPlayer(player);
      onCancelEditName()
    })
  }

  if(!player) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.toolbar}>
        <Link to="/">
          <Button icon="arrow-left" />
        </Link>
        <Button 
          icon="trash" 
          color="red" 
          onClick={() => setModalIsOpen(true)}
        />
      </div>
      <div className={styles.playerContainer}>
        <div className={styles.playerInfo}>
          <img src={player.image} alt="avatar" />
          
            {editingName ? (
              <div className={styles.playerName}>
                <TextInput 
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  ref={nameInputRef}
                  onMounted={() => nameInputRef.current?.focus()}
                  onFocus={e => e.target.select()}
                  onKeyUp={e => e.key === 'Enter' && onNewNameSubmit()}
                />
                <Button 
                  icon="check" 
                  color="green"
                  onClick={onNewNameSubmit}
                />
                <Button 
                  icon="close"
                  onClick={() => onCancelEditName()} 
                />
              </div>
            ) : (
              <div className={styles.playerName}>
                <h2>{player.name}</h2>
                <Button 
                  transparent 
                  icon="pen" 
                  onClick={startEditName}
                />
              </div>
            )}
            
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        title="Delete Player"
        actions={(
          <div>
            <Button 
              color="red"
              onClick={() => onDeletePlayerSubmit()}
            >
              Delete
            </Button>
            <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
          </div>
        )}
      >
        {`Are you sure you wish to delete player ${player.name}?`}
      </Modal>
    </div>
  );
}

export { PlayerPage };
