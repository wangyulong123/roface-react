import React from "react";

import {Tree,Row,Col,DataTable,DetailInfo} from '../../../../src/components';

export default class DictManager extends React.Component {

    constructor(props) {
        super();
        this.state = {
            dictCode:'_ALL_'
        }
    }

    _listDidMounted = (api) => {
        this.api = api;
        console.log(this);

        this.api.onSelectRow((keys, rows) => {
            console.log(keys);
            console.log(rows);
            console.log(rows[0].code);
            this.setState({dictCode: rows[0].code});
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <DataTable
                            dataFormId="system-DictList"
                            dataFormParams={{dictCode: '_ALL_'}}
                            didMounted={this._listDidMounted}
                        />
                    </Col>

                    <Col span={12}>
                        <DetailInfo
                            dataFormId="system-DictInfo"
                            params={{dictCode: this.state.dictCode}}
                        />
                    </Col>
                </Row>
            </div>

        );
    }
}