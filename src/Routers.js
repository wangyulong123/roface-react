import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './containers/App';
import Home from './containers/Home';

class Routers extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Route path="/home" component={Home} />
        </App>
      </BrowserRouter>
    );
  }
}

export default Routers;
