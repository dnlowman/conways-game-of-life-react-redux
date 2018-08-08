import 'normalize.css'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Grid from './containers/Grid';
import reducer from './reducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <Grid />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
