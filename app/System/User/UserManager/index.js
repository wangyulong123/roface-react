import React from 'react';
import {Tree,Row,Col,DataTable,DetailInfo,Tabs} from '../../../../src/components';

export default class UserManager extends React.Component {
    constructor(props) {
        super();
        this.state = {
            dataSource: []
        }

        const {rest, openLoading, closeLoading} = props;
        openLoading();
        rest.get('/auth/admin/org/allOrgTree')
            .then((data) => {
                this.setState({dataSource: data});
                closeLoading();
            });

        this.tabsOptions = [
            {
                tab:'用户详情',
                key:"userDetail",
                content: <DetailInfo dataFormId="system-UserInfo"/>
            },
            {
                tab:'角色列表',
                key:"roleList",
                content: <DataTable dataFormId="system-SimpleRoleListForUserManage"/>
            }
        ]

    }
    onSelect = (selectedKeys, info) => {
        console.log('selectedKeys', selectedKeys);
        console.log('info', info);
        console.log(this);
        this.api.run('system-UserList', { orgId: selectedKeys[0]}).then(() => {
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
                            dataFormId="system-UserList"
                            dataFormParams={{orgId: '_ALL_'}}
                            didMounted={this._listDidMounted}
                        />
                    </Col>
                    <Col span={8}>
                        <Tabs options={this.tabsOptions}/>
                    </Col>
                </Row>
            </div>

        );
    }
}

