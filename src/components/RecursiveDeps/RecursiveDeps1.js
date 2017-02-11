import React from 'react';

import { metaData as deps2Data } from './RecursiveDeps2';

export default function () {
  console.log(deps2Data);
  return (
    <div>
      <h1>
        Recursive Module 1
      </h1>

      <span> should bundled to recursiveDepsBundle1 </span>
    </div>
  );
}

export const metaData = {
  name: 'RecursiveDeps1',
};
