import React from 'react';

import SimpleDeps1 from './SimpleDeps1';

const title = 'Rendered from SimpleDeps2';

export default function () {
  return (
    <div>
      <SimpleDeps1 props={{ title }} />

      <span> Simple Deps 2 should bundled only to simpleDepsBundle2 </span>

    </div>
  );
}
