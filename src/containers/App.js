import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Layout, NavMega, FlexTabs, NavTree } from '../components';
import Home from './Home';

const { Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.flexTabs = null;
    this.state = {
      menuData: [],
    };
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
  _dataMount = (data) => {
    this.setState({
      menuData: data,
    });
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
                  <NavMega
                    {...props}
                    menuClick={this._menuClick}
                    ref={this._getInstance}
                    dataMount={this._dataMount}
                  />
                  <div style={{ display: 'flex' }}>
                    <NavTree data={this.state.menuData} />
                    <div style={{ flexGrow: 1 }}>
                      <FlexTabs
                        {...props}
                        data={this.state.menuData}
                        ref={this._getInstance}
                        renderComponent={this._renderComponent}
                      />
                    </div>
                  </div>
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
