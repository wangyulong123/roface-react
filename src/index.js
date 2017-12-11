import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Routers';

function initComponent() {
  ReactDOM.render(<Routers />, document.getElementById('app'));
}

initComponent();
