import React from 'react';

import { addOnKeyDown, removeOnKeyDown } from '../../src/lib/listener';
import { showModal, Icon } from './index';

export const developCompose = (Com) => {
  class DevelopCompose extends React.Component {
    componentDidMount(){
      this.uuid = Math.uuid();
      addOnKeyDown(this._onKeyDown, this.uuid);
    }
    componentWillUnmount(){
      removeOnKeyDown(this.uuid);
    }
    _onMouseOver = () => {
      this.over = true;
    }
    _onMouseLeave = () => {
      this.over = false;
    }
    _openNewTab = (id) => {
      window.open(`/System/SystemManage/DisplayTemplate/TemplateDetail/${id}`);
    }
    _onKeyDown = (event, id) => {
      if (id === this.uuid && this.over) {
        const e = event || window.event;
        if (e.altKey && e.keyCode === 49) {
          showModal(<div>
            {`模板编号:${this.props.dataFormId}`}
            <Icon type="edit" onClick={() => this._openNewTab(this.props.dataFormId)}/>
          </div>);
        }
      }
    }
    render() {
      /* eslint-disable */
      return (
        <div
          onMouseOver={this._onMouseOver}
          onMouseLeave={this._onMouseLeave}
        >
          <Com {...this.props} />
        </div>
      );
    }
  }
  return DevelopCompose;
};
