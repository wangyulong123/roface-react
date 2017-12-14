import React from 'react';

import { Layout, Menu } from '../components';

import Home from './Home';

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Menu />
        </Header>
        <Content>
          <Home />
        </Content>
        <Footer>
          footer
        </Footer>
      </Layout>
    );
  }
}
