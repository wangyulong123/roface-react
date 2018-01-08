import React from 'react';
import ReactDom from 'react-dom';

import { Spin } from '../../src/components';

import * as rest from '../../src/lib/rest';
import * as dataform from '../../src/lib/dataform';

import { addOnResize } from '../../src/lib/listener';

export const compose = (Com, flexTabs, comProps) => {
  class ComposeCom extends React.Component {
    constructor(props){
      super(props);
      this.height = 150;
      this.flag = true;
      this.update = false;
      this.state = {
        spinning: false,
        refresh: false,
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
    componentWillReceiveProps(nextProps) {
      if (this.props.refresh !== nextProps.refresh && nextProps.activeTabId === nextProps.tabItem.id) {
        // 点击了刷新按钮
        this.update = true;
        this.setState({
          refresh: true,
          spinning: true
        }, () => {
          this.setState({
            refresh: false,
            spinning: false
          }, () => {
            this.update = false;
          })
        })
      }
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
      const { history } = comProps;
      const { location } = history;
      const param = JSON.parse(decodeURIComponent(location.search).replace(/^\?/g, ''));
      return (
        <div style={{ overflow: 'auto' }}>
          <Spin spinning={this.state.spinning}>
            {this.state.refresh ? null : <Com
              ref={instance => this.instance = instance}
              flexTabs={flexTabs}
              {...comProps}
              rest={rest}
              dataform={dataform}
              closeLoading={this.closeLoading}
              openLoading={this.openLoading}
              param={param}
            />}
          </Spin>
        </div>
      );
    }
  }
  return ComposeCom;
};
