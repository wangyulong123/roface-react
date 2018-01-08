import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as app from '../autoIndex';

import { NavTree, NavMega, FlexTabs } from '../../src/components';
import PersonalManager from './NavbarComponents/pernalmanager';
import Logo from './NavbarComponents/logo';
import NotFound from './NotFound';
import { compose } from './compose';
// import * as showcase from '../../app/showcase';
// import Home from './Home';

const navTreeStyle = {
  display: 'flex',
  overflow: 'hidden',
  height: '100vh',
};


const megaMenuStyle = {
  display: '',
  overflow: 'hidden',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.flexTabs = null;
    this.state = {
      menuData: [],
      menuType: 'navTree',
      // menuType: 'megaMenu',
    };
    this.cache = {};
  }
  _menuClick = (item, history) => {
    history.replace(`/${item.id}`);
    if (this.flexTabs) {
      this.flexTabs.createTab({...item,
        Com: this._renderComponent(history, item),
      });
    }
  };
  _getObject = (obj, fields) => {
    return fields.reduce((a, b) => {
      const tempB = b.replace(/\W/g, '');
      return a[tempB];
    }, obj);
  };
  _getCom = (props, tab) => {
    if (tab && tab.url) {
      if (!this.cache[tab.id]) {
        this.cache[tab.id] = this._getObject(app, tab.url.split('/')) || NotFound;
      }
      return this.cache[tab.id];
    }
    return NotFound;
  };
  _renderComponent = (props, tab) => {
    const Com = compose(this._getCom(props, tab), this.flexTabs, props, tab);
    return <Com />;
  };
  _getInstance = (instance) => {
    this.flexTabs = instance;
  };
  _dataMount = (data) => {
    this.setState({
      menuData: data,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={(props) => {
            return (
              <div style={ this.state.menuType !== 'navTree' ? megaMenuStyle : navTreeStyle }>
                {
                  this.state.menuType !== 'navTree' ?
                    (<NavMega
                      {...props}
                      menuClick={this._menuClick}
                      ref={this._getInstance}
                      dataMount={this._dataMount}
                      LogoIcon={Logo}
                      NavRight={PersonalManager}
                    />) : (
                  <NavTree
                    {...props}
                    menuClick={this._menuClick}
                    ref={this._getInstance}
                    dataMount={this._dataMount}
                  />)
                }
                <FlexTabs
                  {...props}
                  data={this.state.menuData}
                  ref={this._getInstance}
                  renderComponent={this._renderComponent}
                />
              </div>);
          }}
        />
      </BrowserRouter>
    );
  }
}
