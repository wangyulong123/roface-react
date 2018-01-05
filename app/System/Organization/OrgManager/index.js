import React from 'react';
import {Tree,Row,Col} from '../../../../src/components';
const TreeNode = Tree.TreeNode;


export default class OrgManager extends React.Component {

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Tree
                            showLine
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={this.onSelect}
                        >
                            <TreeNode title="parent 1" key="0-0">
                                <TreeNode title="parent 1-0" key="0-0-0">
                                    <TreeNode title="leaf" key="0-0-0-0" />
                                    <TreeNode title="leaf" key="0-0-0-1" />
                                    <TreeNode title="leaf" key="0-0-0-2" />
                                </TreeNode>
                                <TreeNode title="parent 1-1" key="0-0-1">
                                    <TreeNode title="leaf" key="0-0-1-0" />
                                </TreeNode>
                                <TreeNode title="parent 1-2" key="0-0-2">
                                    <TreeNode title="leaf" key="0-0-2-0" />
                                    <TreeNode title="leaf" key="0-0-2-1" />
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </Col>
                    <Col span={18}></Col>
                </Row>
            </div>

        );
    }
}

