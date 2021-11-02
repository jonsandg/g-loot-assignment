import React from 'react';

interface PlayerListItemProps {
  data: PlayerData;
}

export const PlayerListItem = ({ data }: PlayerListItemProps) => {
  return (
    <li>
        {data.id} {data.name}
    </li>
  );
}