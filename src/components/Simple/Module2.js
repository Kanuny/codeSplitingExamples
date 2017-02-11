import React from 'react';

import styles from './styles/module2.scss';

export default function () {
  console.log(styles);
  return (
    <div>
      <h1> Simple module for bundle 2 </h1>
      <span> This module should bundled to simpleBundle2 </span>
      <span className={styles.blackBorder}>
        Also module2.css link should appeare only after Module2 loaded
      </span>

    </div>
  );
}
