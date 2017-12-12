import React from 'react';
import { Link } from 'react-router-dom';

import '../style/app.less';

export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="rc-app">
          head
        <Link to="/home">home</Link>
        <div>
          {children}
        </div>
         footer
      </div>
    );
  }
}
