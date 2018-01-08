import React from 'react';
import {Tree,Row,Col,DataTable,DetailInfo} from '../../../../src/components';

export default class UserManager extends React.Component {
    constructor(props){
        super();
        this.state = {
            dataSource:[]
        }

        const {rest,openLoading,closeLoading} = props;
        openLoading();
        rest.get('/auth/admin/org/allOrgTree')
            .then((data)=>{
                this.setState({dataSource:data});
                closeLoading();
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
                    <Col span={10}>
                        <DataTable dataFormId="system-AdminUserList"/>
                    </Col>
                    <Col span={8}>
                        <DetailInfo dataFormId="system-AdminUserInfo"/>
                    </Col>
                </Row>
            </div>

        );
    }
}

