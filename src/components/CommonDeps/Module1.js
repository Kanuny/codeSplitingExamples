import React from 'react';

import { module2 } from '../../common/data';

export default function () {
  console.log(module2);
  return (
    <div>
      <h1>
        Module 1
      </h1>

      <span> should bundled to commonDepsBundle2 common/data should bundled to common bundle </span>
    </div>
  );
}
