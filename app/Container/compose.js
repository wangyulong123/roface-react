import React from 'react';
import ReactDom from 'react-dom';

import { Spin } from '../../src/components';

import * as rest from '../../src/lib/rest';
import * as dataform from '../../src/lib/dataform';

import { addOnResize } from '../../src/lib/listener';

export const compose = (Com, flexTabs, comProps, menuType) => {
  class ComposeCom extends React.Component {
    constructor(props){
      super(props);
      this.megaMenuHeight = 150;
      // this.navTreeHeight = 150;
      // this.navTreeHeight = 20;
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
      if (this.props.refreshStatus !== nextProps.refreshStatus) {
        // 点击了刷新按钮
        if (nextProps.activeTabId === nextProps.tabItem.id ||
          this._checkRefreshId(nextProps.tabItem.id, nextProps.refreshId)) {
          this.refresh();
        }
      }
    }
    _checkRefreshId = (id, refreshId) => {
      if (refreshId) {
        if (Array.isArray(refreshId)) {
          return refreshId.includes(id);
        }
        return id === refreshId;
      }
      return false;
    };
    refresh = () => {
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
    };
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
      const { menuType } = this.props;
      // 设置flextabs中内容的显示高度
      this.dom.style.height = (document.documentElement.clientHeight - (menuType === 'navTree' ? this.navTreeHeight : this.megaMenuHeight)) + 'px';
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
      const { refresh } = this.props;
      const { history } = comProps;
      const { location } = history;
      const paramStr = decodeURIComponent(location.search).replace(/^\?/g, '');
      const param = (paramStr && JSON.parse(paramStr)) || {};
      return (
        <div style={{ overflow: 'auto' }}>
          <Spin spinning={this.state.spinning}>
            {this.state.refresh ? null : <Com
              ref={instance => this.instance = instance}
              flexTabs={{
                open: flexTabs.createTab,
                openIframe: flexTabs.createIframeTab,
                close: flexTabs.closeTab
              }}
              {...comProps}
              rest={rest}
              dataform={dataform}
              closeLoading={this.closeLoading}
              openLoading={this.openLoading}
              param={param}
              refresh={refresh}
            />}
          </Spin>
        </div>
      );
    }
  }
  return ComposeCom;
};
