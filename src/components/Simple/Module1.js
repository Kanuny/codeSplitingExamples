import React from 'react';

import styles from './styles/module1.scss';

export default function () {
  return (
    <div>
      <h1> Simple module for bundle 1 </h1>
      <span> This module should bundled to simpleBundle1 </span>
      <div className={styles.redBorder}>
        Also module1.scss link should appeare only after Module1 loaded
      </div>
    </div>
  );
}
