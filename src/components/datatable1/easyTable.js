/**
 * Created by dpcui on 09/01/2018.
 */

import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Table, LocaleProvider } from 'antd';
import * as components from '../index';

const EditableCell = ({editable, value, comp, onChange, options}) => {
  const Comp = components[comp];
  return (
    <div>
      {editable ?
        <Comp
          value={value}
          onChange={e => onChange(e)}
          options={options}
        />
        : value
      }
    </div>
  );
};

class RoEasyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      dataSource: props.dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns,
      dataSource: nextProps.dataSource,
    });
  }

  handleChange = (value, key, column) => {};

  renderColumns = (text, comp, record, column) => {
    return (
      <EditableCell
        editable={false}
        value={text}
        comp={comp}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  };

  render() {
    return(
      <LocaleProvider locale={zhCN}>
        <Table
          {...this.props}
          columns={this.state.columns}
          dataSource={this.state.dataSource}
        />
      </LocaleProvider>
    );
  }
}

export default RoEasyTable;
