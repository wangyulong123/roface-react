import React from "react";

import { DataTable } from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    didMounted(vm) {
        vm.run('demo-MapPersonList', {code: 'MenuList'}).then(() => {
        });
        vm.setColumnTemplate('name', (row, column, index, text) => {
            return (<a style={{ backgroundColor: 'green' }}>{text}</a>);
        });

    }

    render() {
        return (
            <div>
                <DataTable didMounted={this.didMounted}/>
            </div>
        );
    }
}