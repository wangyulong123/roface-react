import React from 'react';

import { Layout, MegaMenu } from '../components';

import Home from './Home';

const { Content, Footer } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <MegaMenu />
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
