import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import styles from './PlayerPage.module.scss';
import { getPlayer, deletePlayer } from 'api';

import { Header } from 'components/Header';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

type RouteParams = {
  id: string;
} 

const PlayerPage = () => {

  const [player, setPlayer] = useState<PlayerData>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          <div>
            <h2>{player.name}</h2>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        title="Delete Player"
        actions={[
          <Button 
            color="red"
            onClick={() => onDeletePlayerSubmit()}
          >
            Delete
          </Button>,
          <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
        ]}
      >
        {`Are you sure you wish to delete player ${player.name}?`}
      </Modal>
    </div>
  );
}

export { PlayerPage };
