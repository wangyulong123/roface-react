import React from 'react';
import {Tree,Row,Col} from '../../../../src/components';
const TreeNode = Tree.TreeNode;

const treeData = [{
    title: '0-0',
    key: '0-0',
    children: [{
        title: '0-0-0',
        key: '0-0-0',
        children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
        ],
    }, {
        title: '0-0-1',
        key: '0-0-1',
        children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
        ],
    }, {
        title: '0-0-2',
        key: '0-0-2',
    }],
}, {
    title: '0-1',
    key: '0-1',
    children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
    ],
}, {
    title: '0-2',
    key: '0-2',
}];

export default class OrgManager extends React.Component {

    onSelect(selectedKeys, info){
        console.log('onSelect', nodeKey);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Tree
                            showLine
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={this.onSelect}
                            dataSource={treeData}
                            nodeName="title" nodeValue="key" childrenKey="children"
                        >
                        </Tree>
                    </Col>
                    <Col span={18}></Col>
                </Row>
            </div>

        );
    }
}

