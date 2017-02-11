import React from 'react';

const defaultTitle = 'rendered from simpleDeps1 route';

export default function (props: Object) {
  return (
    <div>
      <h1> Simple Deps 1 Module</h1>
      <h2> {props.title ? props.title : defaultTitle}</h2>

      <span> Simple Deps 1 should bundled both to simpleDepsBundle1 and simpleDepsBundle2 </span>
    </div>
  );
}
