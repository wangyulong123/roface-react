import React from 'react';
import ReactDOM from 'react-dom';
// import Routers from './Routers';
import App from './containers/App';

function initComponent() {
    ReactDOM.render(<App />, document.getElementById('app'));
}

initComponent();
