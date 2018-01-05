import React from "react";
import {DetailTable} from '../../../../src/components';

let vm = null;

function onMounted(_vm) {
    vm = _vm;
    vm.run('system-MenuList', {code: 'MenuList'}).then(() => {
    });
}

export default class MenuConfigList extends React.Component {
    render() {
        return (
            <div>
                <DetailTable onMounted={onMounted}/>
            </div>
        );
    }
}