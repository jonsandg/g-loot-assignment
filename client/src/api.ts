const API_URL = 'http://localhost:3000';

export const getPlayer = (id: string): Promise<PlayerData> => {
  return fetch(`${API_URL}/player/${id}`)
    .then(res => res.json());
}

export const getAllPlayers = (): Promise<PlayerData[]> => {
  return fetch(`${API_URL}/players`)
    .then(res => res.json());
}

export const addPlayer = (name: string): Promise<PlayerData> => {
  return fetch(`${API_URL}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
  .then(res => res.json());
}

export const deletePlayer = (id: string): Promise<PlayerData> => {
  return fetch(`${API_URL}/player/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json());
}

export const updatePlayer = (id: string, name: string): Promise<PlayerData> => {
  return fetch(`${API_URL}/player/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
  .then(res => res.json());
}