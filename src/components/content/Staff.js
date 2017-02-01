import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row,Col,Table, Input, Button } from 'antd';

import SearchAutoSuggest from '../SearchAutoSuggest'



const Search = Input.Search

const Staff = React.createClass({

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
  eachGuide(key){
    console.log(key)
  },

  render() {

    //table
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',

      filteredValue: filteredInfo.nickname || null,
      onFilter: (value, record) => record.nickname.includes(value),
      sorter: (a, b) => a.nickname.length - b.nickname.length,
      sortOrder: sortedInfo.columnKey === 'nickname' && sortedInfo.order,
    },
    {

      title: 'Expert',
      dataIndex: 'expert',
      key: 'expert',
      filters: [
        { text: 'Morning', value: 'Morning' },
        { text: 'Dinner', value: 'Dinner' },
        { text: 'TukTuk', value: 'TukTuk' }
      ],
      filteredValue: filteredInfo.expert || null,
      onFilter: (value, record) => record.expert.includes(value),
      sorter: (a, b) => a.expert.length - b.expert.length,
      sortOrder: sortedInfo.columnKey === 'expert' && sortedInfo.order,
    }, {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
      filters: [
        { text: 'Bangkok', value: 'Bangkok' },
        { text: 'Chiangmai', value: 'Chiangmai' },
      ],
      filteredValue: filteredInfo.place || null,
      onFilter: (value, record) => record.place.includes(value),
      sorter: (a, b) => a.place.length - b.place.length,
      sortOrder: sortedInfo.columnKey === 'place' && sortedInfo.order,
    }];

    return (
      <div>
      <div className = "topic">
        <h2>Staff</h2>
      </div>

      <div className = "guide-filter">
          <SearchAutoSuggest dispatch={this.props.dispatch} data = {this.props.guideDetail}
            value = {this.state.value}/>
      </div>

      <div className = "guide-container">
        <div className="table-operations">
        </div>
        <Table columns={columns} dataSource={this.props.guideDetail} onChange={this.handleChange}
           />
      </div>
    </div>
    );
  },
});

const mapStateToProps = (state) => {

    return {
        guideDetail: state.guideDetail,
        input: state.search.search_input
    };
}

export default connect(mapStateToProps)(Staff)
