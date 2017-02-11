import React from 'react';

import { module1 } from '../../common/data';

export default function () {
  console.log(module1);
  return (
    <div>
      <h1>
        Module 1
      </h1>

      <span> should bundled to commonDepsBundle2 common/data should bundled to common bundle </span>
    </div>
  );
}
