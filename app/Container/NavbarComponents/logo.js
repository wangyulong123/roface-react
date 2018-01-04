import React from 'react';

export default class Logo extends React.Component {
  render() {
    const {prefix = 'ro'} = this.props;
    return (
      <div className={`${prefix}-navbar-logo`}>
        <span className={`${prefix}-navbar-icon`} />
      </div>
    );
  }
}
