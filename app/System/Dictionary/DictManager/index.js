import React from "react";

import { Row, Col, DataTable, DetailInfo, Button} from '../../../../src/components';

export default class DictManager extends React.Component {

    constructor(props) {
        super();
        this.state = {
            dictCode: '_ALL_',
            infoDisplayType: 'none'
        }
    }

    infoFormReady = (infoApi) => {
        this.infoApi = infoApi;
    };

    listDidMounted = (tableApi) => {
        this.tableApi = tableApi;

        this.tableApi.addBtn({
            type: 'primary',
            onclick: this.openDetailInfo,
            name: '新增'
        });


        this.tableApi.onSelectRow((keys, rows) => {
            this.setState({dictCode: rows[0].code, infoDisplayType: ''});
            //this.infoApi.refresh();
        });
    };

    openDetailInfo = () => {
        this.setState({infoDisplayType: ''});
    }

    infoSave = () => {
        this.infoApi.saveData((res) => {
            console.log(res)
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <DataTable
                            dataFormId="system-DictList"
                            dataFormParams={{dictCode: '_ALL_'}}
                            didMounted={this.listDidMounted}
                        />
                    </Col>

                    <Col span={12}>
                        <div style={{display: this.state.infoDisplayType}}>
                            <DetailInfo
                                dataFormId="system-DictInfo"
                                didMount={this.infoFormReady}
                                params={{dictCode: this.state.dictCode}}
                            />

                            <Button type='primary' onClick={this.infoSave}>保存</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}