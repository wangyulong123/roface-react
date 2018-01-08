import React from 'react';
import { addOnResize } from '../../../src/lib/listener';
import profile from '../../../profile';

export default class Iframe extends React.Component {
  constructor(){
    super();
    this.height = 150;
    this.state = {
      clientHeight: '100%',
    };
  }
  componentDidMount(){
    this._checkWidth();
    addOnResize(this._checkWidth);
  }
  _checkWidth = () => {
    this.setState({
      clientHeight: `${document.documentElement.clientHeight - this.height}px`,
    });
  };
  render() {
    /* eslint-disable */
    const { url } = this.props;
    const tempUrl = url.startsWith('http://') ? url : `${profile.baseUrl}/${url}`;
    return <iframe
      width="100%"
      height={this.state.clientHeight}
      src={tempUrl}
    >{}</iframe>;
  }
}