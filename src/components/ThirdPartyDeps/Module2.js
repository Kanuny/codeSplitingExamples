import React from 'react';

import { module1 } from './commonData';

export default function () {
  console.log(module1);
  return (
    <div>
      <h1>
        Module 1
      </h1>

      <span> should bundled to thirdPartyDepsBundle2 with commonData file </span>
    </div>
  );
}
