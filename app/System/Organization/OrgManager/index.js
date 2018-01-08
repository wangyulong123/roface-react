import React from 'react';
import {Tree,Row,Col,DataTable,DetailInfo} from '../../../../src/components';

export default class OrgManager extends React.Component {
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

    onSelect = (selectedKeys, info) => {
        console.log('selectedKeys', selectedKeys);
        console.log('info', info);
        console.log(this);
        this.api.run('system-AdminOrgList', { orgId: selectedKeys[0]}).then(() => {
           console.log('chenggong')
        });
    };
    _listDidMounted = (api) => {
        this.api = api;
        console.log(this);
    };

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
                        <DataTable
                            dataFormId="system-AdminOrgList"
                            dataFormParams={{orgId: '0001'}}
                            didMounted={this._listDidMounted}
                        />
                    </Col>
                    <Col span={8}>
                        <DetailInfo dataFormId="system-AdminOrgInfo"/>
                    </Col>
                </Row>
            </div>

        );
    }
}

