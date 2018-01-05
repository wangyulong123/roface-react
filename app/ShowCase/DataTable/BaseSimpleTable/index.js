import React from "react";

import { DataTable } from '../../../../src/components';

export default class BaseSimpleTable extends React.Component {
    didMounted(vm) {
        vm.run('system-MenuList', {code: 'MenuList'}).then(() => {
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