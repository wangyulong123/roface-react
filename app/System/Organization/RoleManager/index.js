import React from 'react';
import {Row, Col, DataTable, Tabs, DetailInfo, Button} from '../../../../src/components';
const TabPane = Tabs.TabPane;

export default class OrgManager extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 1,
        };
        this.info = null;
        this.key = null;
        this.tableData = null;
    }

    listFormReady = (dataTable, meta, dom) => {
        console.warn(dataTable, meta, dom);
    };

    roleUserListFormReady = (dataTable, meta, dom) => {
        console.warn(dataTable, meta, dom);
    };
    roleUserListDidMounted = (api) => {

    }



    infoDataReady = (infoApi) => {
        this.info = infoApi;
    };

    saveData = () => {
        this.info.saveData((error,values) => {
            if (error == null) {
                this.info.setData(values);
                this.tableData.run("system-RoleList",{code: 'RoleList'});
            }
        });
    };



    listDidMounted = (api) => {
        const dataTable = api;
        const that = this;
        this.tableData = dataTable;

        const appendRow = () => {
            this.info.refresh();
        };

        const removeRows = () => {
            const rows = dataTable.getSelectedRows();
            if (!rows || !rows.length) {
                message.warning('请选择要删除的行数据');
                return;
            }
            dataTable.removeRows(rows);
        }

        dataTable.addBtn({
            type: 'primary',
            onclick: appendRow,
            name: '新增',
        });
        dataTable.addBtn({
            type: 'primary',
            onclick: removeRows,
            name: '删除',
        });

        dataTable.setSelectedRows((row, index) => {
            console.log(index);
            return index === 0;
        });



        dataTable.onSelectRow((selectedKeys, selectedRows) => {
            const {closeLoading, openLoading} = this.props;
            openLoading && openLoading();
            const rows = dataTable.getData();
            const rowsIdx = rows.filter((row) => {
                return row.$$key === selectedRows[0].$$key;
            })[0];
            that.key = rowsIdx.$$key;
            console.log(that);
            //this.setState({id: rowsIdx.id});
            that.info.refresh({params: {id: rowsIdx.id}},() => {closeLoading && closeLoading()});

        });
    };





    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <DataTable
                            dataFormId="system-RoleList"
                            dataFormParams={{code: 'RoleList'}}
                            formReady={this.listFormReady}
                            didMounted={this.listDidMounted}
                        />
                    </Col>
                    <Col span={12}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="基本信息" key="1">
                               <DetailInfo dataFormId="system-RoleInfo"
                                           dataReady={this.infoDataReady}
                                />
                                <Button type="primary" onClick={() => this.saveData()} >保存</Button>
                            </TabPane>
                            <TabPane tab="权限" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="角色下用户" key="3">
                                <DataTable dataFormId="system-UserListForRoleManage"
                                           dataFormParams={{roleId: 1}}
                                           formReady={this.roleUserListFormReady}
                                           didMounted={this.roleUserListDidMounted}
                                />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}

