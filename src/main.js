import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, match, browserHistory } from 'react-router';

import createStore from './store/createStore';
import router from './router';

// ========================================================
// Store Instantiation
// ========================================================
// eslint-disable-next-line
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  // eslint-disable-next-line
  const routes = router(store);
  match(
    { history: browserHistory, routes },
    (error, redirectLocation, renderProps) => {
      ReactDOM.render(
        <Provider store={store} key="provider">
          <Router {...renderProps} />
        </Provider>,
        MOUNT_NODE,
      );
    },
  );
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      // eslint-disable-next-line
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./router', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }),
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
