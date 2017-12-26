import React from 'react';
import ReactDom from 'react-dom';

import * as rest from '../lib/rest';

import { addOnResize } from '../lib/listener';

export const compose = (Com, flexTabs, comProps) => {
  class ComposeCom extends React.Component {
    constructor(props){
      super(props);
      this.height = 150;
      this.flag = true;
    }
    componentDidMount(){
      /* eslint-disable */
      this.dom = ReactDom.findDOMNode(this);
      this._setComHeight();
      addOnResize(() => {
        if (this.flag) {
          this.flag = false;
          setTimeout(() => {
            this._setComHeight();
            this.flag = true;
          }, 100)
        }
      })
    };
    _setComHeight = () => {
      this.dom.style.height = (document.documentElement.clientHeight - this.height) + 'px';
    };
    render() {
      return (
        <div style={{ overflow: 'auto' }}>
          <Com flexTabs={flexTabs} {...comProps} rest={rest} />
        </div>
      );
    }
  }
  return ComposeCom;
};
