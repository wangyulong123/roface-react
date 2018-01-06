import React from 'react';
import { addOnResize } from '../../../../src/lib/listener';

export default class WorkFlowDesigner extends React.Component {
  constructor(){
    super();
    this.height = 150;
    this.state = {
      clientHeight: '100%'
    }
  }
  componentDidMount(){
    this._checkWidth();
    addOnResize(this._checkWidth);
  };
  _checkWidth = () => {
    this.setState({
      clientHeight: (document.documentElement.clientHeight - this.height) + 'px'
    });
  };
  render() {
    return <iframe
      width="100%"
      height={this.state.clientHeight}
      src="http://192.168.64.23:8080/workflow/modeler.html?modelId=252501"
    >{}</iframe>;
  }
}