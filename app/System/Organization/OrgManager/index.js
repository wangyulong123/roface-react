import React from 'react';
import {Tree,Row,Col,DataTable} from '../../../../src/components';
const TreeNode = Tree.TreeNode;

export default class OrgManager extends React.Component {
    constructor(props){
        super();
        this.state = {
            dataSource:[]
        }

        const {rest,openLoading,close} = props;
        openLoading();
        rest.get('/auth/admin/org/allOrgTree')
            .then((data)=>{
                this.setState({dataSource:data});
                props.closeLoading();
            });
    }

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
                            defaultExpandedKeys={['0001','0007']}
                            onSelect={this.onSelect}
                            dataSource={this.state.dataSource}
                            nodeTitle="value.name" nodeKey="value.id" childrenKey="children"
                        >
                        </Tree>
                    </Col>
                    <Col span={18}>
                        <DataTable dataFormId="workflow-DesignerModelList"/>
                    </Col>
                </Row>
            </div>

        );
    }
}

