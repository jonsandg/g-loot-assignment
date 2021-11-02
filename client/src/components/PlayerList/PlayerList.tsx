import React from 'react';
import { PlayerListItem } from './PlayerList.Item'

interface PlayerListProps {
  players: PlayerData[];
}

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <ul>
      {players.map(player => (
        <PlayerListItem key={player.id} data={player} />
      ))}
    </ul>
  );
}