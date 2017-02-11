import React from 'react';

import { metaData as deps1Data } from './RecursiveDeps1';

export default function () {
  console.log(deps1Data);
  return (
    <div>
      <h1>
        Recursive Module 2
      </h1>

      <span> should bundled to recursiveDepsBundle1 </span>
    </div>
  );
}

export const metaData = {
  name: 'RecursiveDeps2',
};
