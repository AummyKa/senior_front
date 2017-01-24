import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row,Col,Table, Input, Button } from 'antd';

import SearchAutoSuggest from '../SearchAutoSuggest'



const Search = Input.Search

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];


const PendingList = React.createClass({

  getInitialState() {
    return {
      filteredInfo: null,
      sortedInfo: null,
      value: ''
    };
  },
  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  },
  clearFilters() {
    this.setState({ filteredInfo: null });
  },
  clearAll() {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  },


  render() {

    //table
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };


    return (
      <div>
      <div className = "topic">
        <h2>PendingList</h2>
      </div>

      <div className = "guide-filter">
          <SearchAutoSuggest dispatch={this.props.dispatch} data = {data}
            value = {this.state.value}/>
      </div>

      <div className = "guide-container">
        <div className="table-operations">
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    </div>
    );
  },
});

function mapStateToProps(state) {

    return {
        guideDetail: state.guideDetail,
        input: state.search.search_input
    };
}

export default connect(mapStateToProps)(PendingList)
