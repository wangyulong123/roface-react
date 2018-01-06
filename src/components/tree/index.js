/**
 * Created by dpcui on 06/01/2018.
 */

import React from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

class RoTree extends React.Component {
  static defaultProps = {
    nodeName: 'title',
    nodeValue: 'key',
    childrenKey: 'children',
  };
  static TreeNode = TreeNode;
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderTreeNode = (dataS) => {
    const { nodeName, nodeValue, childrenKey } = this.props;
    return dataS && dataS.map((item) => {
      if (item[childrenKey]) {
        return (
          <TreeNode {...item} title={item[nodeName]} key={item[nodeValue]} dataRef={item}>
            {this._renderTreeNode(item[childrenKey])}
          </TreeNode>
        );
      }
      return (
        <TreeNode {...item} title={item[nodeName]} key={item[nodeValue]} dataRef={item} />
      );
    });
  };

  render() {
    const { children, dataSource } = this.props;
    return (
      <Tree {...this.props} >
        { children || this._renderTreeNode(dataSource)}
      </Tree>
    );
  }
}

export default RoTree;
