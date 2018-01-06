/**
 * Created by dpcui on 06/01/2018.
 */

import React from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

class RoTree extends React.Component {
  static defaultProps = {
    nodeTitle: 'title',
    nodeKey: 'key',
    childrenKey: 'children',
  };
  static TreeNode = TreeNode;
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderTreeNode = (dataS) => {
    const { nodeTitle, nodeKey, childrenKey } = this.props;
    const titleRef = nodeTitle.includes('.') ? nodeTitle.split('.') : nodeTitle;
    const keyRef = nodeKey.includes('.') ? nodeKey.split('.') : nodeKey;
    return dataS && dataS.map((item) => {
      if (item[childrenKey]) {
        return (
          <TreeNode
            {...item}
            title={titleRef instanceof Array ? item[titleRef[0]][titleRef[1]] : item[titleRef]}
            key={keyRef instanceof Array ? item[keyRef[0]][keyRef[1]] : item[keyRef]}
            dataRef={item}
          >
            {this._renderTreeNode(item[childrenKey])}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          {...item}
          title={titleRef instanceof Array ? item[titleRef[0]][titleRef[1]] : item[titleRef]}
          key={keyRef instanceof Array ? item[keyRef[0]][keyRef[1]] : item[keyRef]}
          dataRef={item}
        />
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
