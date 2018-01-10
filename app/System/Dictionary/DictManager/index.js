import React from "react";

import {Row, Col, DataTable, DetailInfo, Button, Message, Modal} from '../../../../src/components';

export default class DictManager extends React.Component {

    constructor(props) {
        super();
        this.state = {
            dictCode: '_ALL_',
            dictItemCode: '0',
            infoDisplayType: 'none',
            itemListDisplayType: 'none',
            itemInfoDisplayType: 'none'
        };
    }

    infoFormReady = (infoApi) => {
        this.infoApi = infoApi;
    };

    itemInfoFormReady = (infoApi) => {
        this.itemInfoApi = infoApi;
    };

    listDidMounted = (tableApi) => {
        this.tableApi = tableApi;

        this.tableApi.addBtn({
            type: 'primary',
            onclick: this.openDetailInfo,
            name: '新增'
        });
        this.tableApi.addBtn({
            type: 'danger',
            onclick: this.deleteOneDictRecord,
            name: '删除',
            icon: 'delete',
        });

        this.tableApi.onSelectRow((keys, rows) => {
            this.setState({
                dictCode: rows[0].code,
                infoDisplayType: '',
                itemListDisplayType: '',
                itemInfoDisplayType: 'none'
            });
            this.itemListApi.run('system-DictItemList', {dictCode: rows[0].code});
        });
    };

    itemListDidMounted = (tableApi) => {
        this.itemListApi = tableApi;

        this.itemListApi.addBtn({
            type: 'primary',
            onclick: this.openItemDetailInfo,
            name: '新增'
        });
        this.itemListApi.addBtn({
            type: 'danger',
            onclick: this.deleteOneDictItemRecord,
            name: '删除',
            icon: 'delete',
        });

        this.itemListApi.onSelectRow((keys, rows) => {
            this.setState({
                dictCode: rows[0].dictCode,
                dictItemCode: rows[0].code,
                infoDisplayType: '',
                itemInfoDisplayType: ''
            });
        });
    };

    openDetailInfo = () => {
        this.setState({dictCode: '_ALL_', infoDisplayType: '',itemListDisplayType: 'none', itemInfoDisplayType: 'none'});
    };

    openItemDetailInfo = () => {
        this.setState({dictCode: this.state.dictCode, dictItemCode: '_ALL_', itemInfoDisplayType: ''});
    };

    tableRefresh = () => {
        this.tableApi.run('system-DictList', {dictCode: '_ALL_'});
    };

    itemtListRefresh = () => {
        this.itemListApi.run('system-DictItemList', {dictCode: this.state.dictCode});
    };

    deleteOneDictRecord = () => {
        const {rest} = this.props;
        const that = this;
        if (!that.tableApi.getSelectedRow()) {
            Message.info('请先选择一行！');
            return;
        }

        Modal.confirm({
            title: '删除确认',
            content: '您确定删除吗？删除后数据不可恢复！',
            onOk() {
                const url = `/dataform/delete/list/system-DictList`;
                rest.post(url, [{code: that.tableApi.getSelectedRow().code}])
                    .then(that.tableRefresh);
            },
            onCancel() {
                return;
            },
        });

        this.setState({infoDisplayType: 'none', itemListDisplayType: 'none', itemInfoDisplayType: 'none'});
    };

    deleteOneDictItemRecord = () => {
        const {rest} = this.props;
        const that = this;
        console.log(that.itemListApi.getSelectedRow())
        if (!that.itemListApi.getSelectedRow()) {
            Message.info('请先选择一行！');
            return;
        }

        Modal.confirm({
            title: '删除确认',
            content: '您确定删除吗？删除后数据不可恢复！',
            onOk() {
                const url = `/dataform/delete/list/system-DictItemList`;
                rest.post(url, [{
                    dictCode: that.itemListApi.getSelectedRow().dictCode,
                    code: that.itemListApi.getSelectedRow().code
                }])
                    .then(that.itemtListRefresh);
            },
            onCancel() {
                return;
            },
        });

        this.setState({itemInfoDisplayType: 'none'});
    };

    infoSave = () => {
        this.infoApi.saveData((res) => {
            console.log(res);
            this.tableRefresh();
        });
    };

    itemInfoSave = () => {
        this.itemInfoApi.saveData((res) => {
            console.log(res);
            this.itemtListRefresh();
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Row>
                            <DataTable
                                dataFormId="system-DictList"
                                dataFormParams={{dictCode: '_ALL_'}}
                                didMounted={this.listDidMounted}
                            />
                        </Row>
                        <Row>
                            <div style={{display: this.state.infoDisplayType}}>
                                <Button type='primary' onClick={this.infoSave}>保存</Button>
                                <DetailInfo
                                    dataFormId="system-DictInfo"
                                    didMount={this.infoFormReady}
                                    params={{dictCode: this.state.dictCode}}
                                />
                            </div>
                        </Row>
                    </Col>

                    <Col span={12}>
                        <Row>
                            <div style={{display: this.state.itemListDisplayType}}>
                                <DataTable
                                    dataFormId="system-DictItemList"
                                    dataFormParams={{dictCode: this.state.dictCode}}
                                    didMounted={this.itemListDidMounted}
                                />
                            </div>
                        </Row>
                        <Row>
                            <div style={{display: this.state.itemInfoDisplayType}}>
                                <Button type='primary' onClick={this.itemInfoSave}>保存</Button>
                                <DetailInfo
                                    dataFormId="system-DictItemInfo"
                                    didMount={this.itemInfoFormReady}
                                    params={{dictCode: this.state.dictCode, dictItemCode: this.state.dictItemCode}}
                                />
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}