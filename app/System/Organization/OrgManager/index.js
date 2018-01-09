import React from 'react';
import {Tree,Row,Col,DataTable,DetailInfo} from '../../../../src/components';

export default class OrgManager extends React.Component {
    constructor(props){
        super();
        this.state = {
            dataSource:[],
            orgId:'_ALL_'
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
           console.log('success')
        });
    };
    _listDidMounted = (api) => {
        this.api = api;
        console.log(this);

        this.api.onSelectRow((keys, rows) => {
            console.log(keys);
            console.log(rows);
            console.log(rows[0].id);
            this.setState({orgId: rows[0].id});
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Tree
                            showLine
                            defaultExpandedKeys={['0001','0002']}
                            onSelect={this.onSelect}
                            dataSource={this.state.dataSource}
                            nodeTitle="value.name" nodeKey="value.id" childrenKey="children"
                        >
                        </Tree>
                    </Col>
                    <Col span={10}>
                        <DataTable
                            dataFormId="system-AdminOrgList"
                            dataFormParams={{orgId: '_ALL_'}}
                            didMounted={this._listDidMounted}
                        />
                    </Col>
                    <Col span={8}>
                        <DetailInfo
                            dataFormId="system-AdminOrgInfo"
                            params={{orgId: this.state.orgId}}
                        />
                    </Col>
                </Row>
            </div>

        );
    }
}

