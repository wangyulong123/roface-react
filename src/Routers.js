import React from 'react';
import { Route, HashRouter } from 'react-router-dom';

import App from './containers/App';
import Home from './containers/Home';

class Routers extends React.Component {
  render() {
    return (
      <HashRouter path="/">
        <App>
          <Route path="/home" component={Home} />
        </App>
      </HashRouter>
    );
  }
}

export default Routers;
