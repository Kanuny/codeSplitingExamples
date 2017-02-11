import React from 'react';
import { Route } from 'react-router';

import Main from './components/Main/Main';

export default function (history: Object) {
  return (
    <Route history={history}>
      <Route path="/" component={Main} />
      <Route
        path="/simple1"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/Simple/Module1').default),
            'simpleBundle1',
          );
        }}
      />
      <Route
        path="/simple2"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/Simple/Module2').default),
            'simpleBundle2',
          );
        }}
      />

      <Route
        path="/simpleDeps1"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/SimpleDeps/SimpleDeps1').default),
            'simpleDepsBundle1',
          );
        }}
      />
      <Route
        path="/simpleDeps2"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/SimpleDeps/SimpleDeps2').default),
            'simpleDepsBundle2',
          );
        }}
      />

      <Route
        path="/recursiveDeps1"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/RecursiveDeps/RecursiveDeps1').default),
            'recursiveDepsBundle1',
          );
        }}
      />
      <Route
        path="/recursiveDeps2"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/RecursiveDeps/RecursiveDeps2').default),
            'recursiveDepsBundle2',
          );
        }}
      />

      <Route
        path="/thirdPartyDeps1"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/ThirdPartyDeps/Module1').default),
            'thirdPartyDepsBundle1',
          );
        }}
      />
      <Route
        path="/thirdPartyDeps2"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/ThirdPartyDeps/Module2').default),
            'thirdPartyDepsBundle2',
          );
        }}
      />

      <Route
        path="/commonDeps1"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/CommonDeps/Module1').default),
            'commonDepsBundle1',
          );
        }}
      />
      <Route
        path="/commonDeps2"
        getComponent={(state, cb) => {
          require.ensure(
            [],
            // eslint-disable-next-line global-require
            () => cb(null, require('./components/CommonDeps/Module2').default),
            'commonDepsBundle2',
          );
        }}
      />


      <Route path="*" component={() => <div>Not Found</div>} />
    </Route>
  );
}

