import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row,Col,Table, Input, Button } from 'antd';
import apiAccess from '../../Helpers/apiAccess'

import SearchAutoSuggest from '../SearchAutoSuggest'



const Search = Input.Search


const StaffUserData = (arrayJSON,resultJSON) =>{

  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {

      var objectJSON = {
        key: i,
        _id: arrayJSON[i]._id,
        name: arrayJSON[i].name,
        email: arrayJSON[i].email,
        role:arrayJSON[i].role
      }

      resultJSON[i] = objectJSON
  }
}else {
  return resultJSON
}
  //return resultJSON
}

const Staff = React.createClass({

  getInitialState() {
    this.queryStaffs()
    return {
      filteredInfo: null,
      sortedInfo: null,
      value: '',
      data: []
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
  queryStaffs(){
    console.log("hello")
    apiAccess({
      url: 'http://localhost:8000/staffs/non-tour-guides',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_STAFF_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_STAFF_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_STAFF_FAILED' })
    })
  },
  componentWillReceiveProps(nextProps){

    if(this.props.staffLists !== nextProps.staffLists){
        console.log(nextProps.staffLists)
        StaffUserData(nextProps.staffLists,this.state.data)
        console.log(this.state.data)
    }
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => record.email.includes(value),
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Customer Service', value: 'Customer Service' },
        { text: 'Operation', value: 'Operation' },
        { text: 'Finance', value: 'Finance' }
      ],
      filteredValue: filteredInfo.role|| null,
      onFilter: (value, record) => record.role.includes(value),
      sorter: (a, b) => a.role.length - b.role.length,
      sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,
    }];

    return (
      <div>
      <div className = "topic">
        <h2>Staff</h2>
      </div>

      <div className = "guide-filter">

      </div>

      <div className = "guide-container">
        <div className="table-operations">
        </div>
        <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange}
           />
      </div>
    </div>
    );
  },
});

const mapStateToProps = (state) => {

    return {
        staffLists: state.getStaffLists.staffLists,
        input: state.search.search_input
    };
}

export default connect(mapStateToProps)(Staff)