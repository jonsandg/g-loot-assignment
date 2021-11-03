import React from 'react';
import { Link } from 'react-router-dom';

interface PlayerListItemProps {
  data: PlayerData;
}

export const PlayerListItem = ({ data }: PlayerListItemProps) => {
  return (
    <li>
      <Link to={`/player/${data.id}`}>
        {data.name}
      </Link>
    </li>
  );
}