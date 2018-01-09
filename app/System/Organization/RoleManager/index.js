import React from 'react';
import {Row, Col, DataTable, Tabs, DetailInfo} from '../../../../src/components';
const TabPane = Tabs.TabPane;

export default class OrgManager extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 1,
        };
        this.infoApi = null;
        this.key = null;
        this.vm = null;
    }

    _listFormReady = (dataTable, meta, dom) => {
        console.warn(dataTable, meta, dom);
    };

    _infoFormReady = (infoApi) => {
        this.infoApi = infoApi;
    };

    _listDidMounted = (api) => {
        const vm = api;
        const that = this;
        this.vm = vm;

        vm.addBtn({
            type: 'primary',
            onclick: appendRow,
            name: '新增',
        });

        vm.setSelectedRows((row, index) => {
            console.log(index);
            return index === 0;
        });

        function appendRow() {
            const row = {
                name: 'SomeoneRear',
                type: 'some'
            };
            vm.appendRow(row);
        };

        vm.onSelectRow((selectedKeys, selectedRows) => {
            const rows = vm.getData();
            const rowsIdx = rows.filter((row) => {
                return row.$$key === selectedRows[0].$$key;
            })[0];
            that.key = rowsIdx.$$key;
            that.infoApi.setData({
                code: rowsIdx && rowsIdx.code,
                name: rowsIdx && rowsIdx.name,
                type: rowsIdx && rowsIdx.type,
                status: rowsIdx && rowsIdx.status
            });
        });
    };

    _infoValuesChange = (values) => {
        const rows = vm.getData();
        const rowsIdx = rows.filter((row) => {
            return row.$$key === this.key;
        })[0];

    }





    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <DataTable
                            dataFormId="system-AdminRoleList"
                            dataFormParams={{code: 'AdminRoleList'}}
                            formReady={this._listFormReady}
                            didMounted={this._listDidMounted}
                        />
                    </Col>
                    <Col span={12}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="基本信息" key="1">
                               <DetailInfo dataFormId="system-AdminRoleInfo"
                                           didMount={this._infoFormReady}
                                           onValuesChange={this._infoValuesChange}
                                />
                            </TabPane>
                            <TabPane tab="权限" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="角色下用户" key="3">Content of Tab Pane 3</TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}

