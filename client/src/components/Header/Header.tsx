import React from 'react';
import logo from 'images/gloot-logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="G-Loot logo" />
      <h1>
        G-Loot Player Directory
      </h1>
    </div>
  );
}