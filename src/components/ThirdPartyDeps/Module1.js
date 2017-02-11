import React from 'react';

import { module2 } from './commonData';

export default function () {
  console.log(module2);
  return (
    <div>
      <h1>
        Module 1
      </h1>

      <span> should bundled to thirdPartyDepsBundle1 with commonData file </span>
    </div>
  );
}
