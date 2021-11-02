import React, { useState, useEffect } from 'react';
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
    <div>
      <PlayerList players={players} />
    </div>
  );
}

export { PlayersPage };
