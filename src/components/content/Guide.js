import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row,Col,Table, Input, Button } from 'antd';

import SearchAutoSuggest from '../SearchAutoSuggest'
import { eachGuide } from '../../actions/action-guideProfile'
import apiAccess from '../../Helpers/apiAccess'

const Search = Input.Search

const GuideUserData = (arrayJSON,resultJSON) =>{

  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {

      var objectJSON = {
        key: i,
        _id: arrayJSON[i]._id,
        name: arrayJSON[i].name,
        email: arrayJSON[i].email,
        role: arrayJSON[i].role
      }

      resultJSON[i] = objectJSON
  }
}else {
  return resultJSON
}
  //return resultJSON
}

const Guide = React.createClass({

  getInitialState() {
    this.getGuideList()
    return {
      filteredInfo: null,
      sortedInfo: null,
      value: '',
      data: [],
      cur_id: ''
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
  eachGuide(event, index){
    let id = event._id

    this.props.dispatch({type : "GUIDE_PROFILE",id})

  },
  getGuideList(){

    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_FAILED' })
    })
  },
  componentWillReceiveProps(nextProps){

    if(this.props.guideLists !== nextProps.guideLists){
      GuideUserData(nextProps.guideLists,this.state.data)
      // this.setState({data: GuideUserData(nextProps.guideDetail,)})
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
        <h2>Guide</h2>
      </div>

      <div className = "guide-filter">

      </div>

      <div className = "guide-container">
        <div className="table-operations">
        </div>
        <Table columns={columns}
          dataSource={this.state.data}
          onChange={this.handleChange}
          onRowClick = {this.eachGuide}/>
      </div>
    </div>
    );
  },
});

function mapStateToProps(state) {

    return {
        guideLists: state.guideDetail.guideLists,
        input: state.search.search_input
    };
}

export default connect(mapStateToProps)(Guide)
//
// <SearchAutoSuggest dispatch={this.props.dispatch} data = {this.props.guideDetail}
//   value = {this.state.value}/>