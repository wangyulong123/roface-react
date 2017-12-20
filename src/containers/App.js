import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Layout, NavMega, FlexTabs } from '../components';
import Home from './Home';

const { Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.flexTabs = null;
  }
  _menuClick = (item, history) => {
    history.replace(`/${item.id}`);
    if (this.flexTabs) {
      this.flexTabs._createTab(item);
    }
  };
  _renderComponent = (props, tab) => {
    console.log(tab);
    return <Home />;
  };
  _getInstance = (instance) => {
    this.flexTabs = instance;
  };
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route
            path="/"
            render={(props) => {
              return (
                <div>
                  <NavMega {...props} menuClick={this._menuClick} ref={this._getInstance} />
                  <FlexTabs
                    {...props}
                    ref={this._getInstance}
                    renderComponent={this._renderComponent}
                  />
                </div>);
            }}
          />
          <Footer>
            footer
          </Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}
