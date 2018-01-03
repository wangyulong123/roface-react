import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const compose = (Com) => {
  class Compose extends React.Component {
    shouldComponentUpdate(nextProps) {
      return this._compareProps(nextProps);
    }
    _compareProps = (nextProps) => {
      const props = ['reading', 'readOnly', 'prefix', 'suffix', 'options', 'value', 'checked', 'displayValue'];
      return props.some((field) => {
        if (Array.isArray(nextProps[field])) {
          return this._compareArray(nextProps[field], this.props[field]);
        }
        return nextProps[field] !== this.props[field];
      });
    }
    _compareArray = (a, b) => {
      if (a.length !== b.length) {
        return true;
      }
      return a.some((value) => {
        if (typeof value === 'string') {
          return !b.includes(value);
        }
        const bCodeObj = b.reduce((pre, next) => {
          return {
            ...pre,
            [pre.code]: next.value,
          };
        }, {});
        return value.code === bCodeObj[value.code];
      });
    }
    render() {
      return <Com {...this.props} />;
    }
  }
  hoistNonReactStatics(Compose, Com);
  return Compose;
};
