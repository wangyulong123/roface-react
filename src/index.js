import React from 'react';
import ReactDOM from 'react-dom';
// import Routers from './Routers';
import App from '../app/Container/App';

function initComponent() {
    ReactDOM.render(<App />, document.getElementById('app'));
}

initComponent();
