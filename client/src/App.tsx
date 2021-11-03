import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styles from './App.module.scss';

import { PlayersPage } from 'pages/players';
import { PlayerPage } from 'pages/player';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.container}>
          <Switch>
            <Route path="/player/:id">
              <PlayerPage />
            </Route>
            <Route path="/">
              <PlayersPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
