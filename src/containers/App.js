import React from 'react';

import { Layout, MegaMenu, RoNumber, RoCurrency } from '../components';

import Home from './Home';

const { Content, Footer } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <MegaMenu />
        <Content>
          <Home />
          <RoNumber />
          <RoCurrency />
        </Content>
        <Footer>
          footer
        </Footer>
      </Layout>
    );
  }
}
