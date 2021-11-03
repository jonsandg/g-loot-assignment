import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayer } from 'api';

type RouteParams = {
  id: string;
} 

const PlayerPage = () => {

  const [player, setPlayer] = useState<PlayerData>();

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    getPlayer(id)
    .then(player => setPlayer(player))
  }, [id]);

  return (
    <div>
      {player ? (
        <p>{player.name}</p>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export { PlayerPage };
