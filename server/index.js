const cuid = require('cuid');
const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const app = express();

/* Setup express middlewares */
app.use(bodyParser.json());
app.use(allowCorsMiddleware);

/* API */
app.get('/players', getPlayers);
app.get('/player/:id', getPlayer);
app.put('/player/:id', putPlayer);
app.post('/player', addPlayer);
app.delete('/player/:id', deletePlayer);

/* Start server */
app.listen(3000, () => console.log('app listening on port 3000.'))

/* The mock 'database' */
const EXTRA_PLAYERS = 50;

let players = [
  { id: 'cjeodaus60000poul1g030oia', name: 'Richard Garfield', image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Richard_Garfield_%28Spiel_2014_cropped%29.jpg'},
  { id: 'cjeodaus60001poule3wjdz1p', name: 'Gabe Newell', image: 'https://pbs.twimg.com/profile_images/415945285517328384/8Occ-B_Y.png' },
];

for (let i = 0; i < EXTRA_PLAYERS; i++) {
  players.push({
    id: cuid(),
    name: faker.name.findName(),
    image: faker.image.avatar()
  })
}

console.log(players)

/* IMPLEMENTATION DETAILS */

/* Return a list of all players
 * Example: localhost:3000/players
 */
function getPlayers(req, res) {
  return res.status(200).json(players).end();
}
/* Return a specific player based on id
 * Example: localhost:3000/player/cjeodaus60000poul1g030oia
 */
function getPlayer(req, res) {
  const id = req.params.id;
  const player = players.find(p => p.id == id);
  return player ? res.status(200).json(player).end() : res.status(404).end();
}
/* Add a new player to the list
 * Example: localhost:3000/player
 * Body: { "name": "Fresh Prince" } */
function addPlayer(req, res) {
  const name = req.body.name;
  if (!name) {
    return res.status(401).end()
  }
  const newPlayer = { id: cuid(), name, image: faker.image.avatar() };
  players = [newPlayer, ...players];
  return res.status(201).json(newPlayer).end();
}
/* Delete a player from the list
 * Example: localhost:3000/player/cjeodaus60000poul1g030oia
 */
function deletePlayer(req, res) {
  const id = req.params.id;
  const removedPlayer = players.find(p => p.id == id);
  players = players.filter(p => p.id != id);
  return res.status(200).json(removedPlayer).end();
}
/* Edit an existing player in the list
 * Example: localhost:3000/player/cjeodaus60000poul1g030oia
 * Body: { "name": "Steve Urkle" }
 */
function putPlayer(req, res) {
  const id = req.params.id;
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }
  players = players.map(p => p.id == id ? { ...p, name } : p);
  return res.status(200).json(players.find(p => p.id == id)).end();
}

/* MISC */

/* Add CORS-headers to every request */
function allowCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
}