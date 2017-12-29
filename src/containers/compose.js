import React from 'react';
import ReactDom from 'react-dom';

import { Spin } from '../components';

import * as rest from '../lib/rest';

import { addOnResize } from '../lib/listener';

export const compose = (Com, flexTabs, comProps) => {
  class ComposeCom extends React.Component {
    constructor(props){
      super(props);
      this.height = 150;
      this.flag = true;
      this.update = false;
      this.state = {
        spinning: false,
      };
    }
    componentDidMount(){
      /* eslint-disable */
      this.dom = ReactDom.findDOMNode(this);
      this._setComHeight();
      addOnResize(this._checkWidth);
    };
    shouldComponentUpdate(){
      return this.update;
    }
    _checkWidth = () => {
      if (this.flag) {
        this.flag = false;
        setTimeout(() => {
          this._setComHeight();
          this.flag = true;
        }, 100)
      }
    };
    _setComHeight = () => {
      this.dom.style.height = (document.documentElement.clientHeight - this.height) + 'px';
    };
    closeLoading = () => {
      this.update = true;
      this.setState({
        spinning: false
      }, () => {
        this.update = false;
      })
    };
    openLoading = () => {
      this.update = true;
      this.setState({
        spinning: true
      }, () => {
        this.update = false;
      })
    };
    render() {
      return (
        <div style={{ overflow: 'auto' }}>
          <Spin spinning={this.state.spinning}>
          <Com flexTabs={flexTabs} {...comProps} rest={rest} closeLoading={this.closeLoading} openLoading={this.openLoading}/>
          </Spin>
        </div>
      );
    }
  }
  return ComposeCom;
};
