import React from 'react';

export const compose = (Com) => {
  class Compose extends React.Component {
    shouldComponentUpdate(nextProps) {
      return this._compareProps(nextProps);
    }
    _compareProps = (nextProps) => {
      const props = ['reading', 'readOnly', 'prefix', 'suffix', 'options', 'value'];
      return props.some(field => nextProps[field] !== this.props[field]);
    }
    render() {
      return <Com {...this.props} />;
    }
  }
  return Compose;
};
