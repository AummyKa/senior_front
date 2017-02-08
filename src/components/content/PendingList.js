import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row,Col,Table, Input, Button, Modal, Form } from 'antd';

import SearchAutoSuggest from '../SearchAutoSuggest'
import apiAccess from '../../Helpers/apiAccess'
import { showConfirm } from '../Modal'


const Search = Input.Search

const confirm = Modal.confirm;

const columns = [
  {
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Email',
  dataIndex: 'email',
},{
  title: 'Roles',
  dataIndex: 'role',
}];


const pendingUserData = (arrayJSON) =>{

  let resultJSON = []

    try{
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
  }catch(e){
    console.log(e)
  }


  return resultJSON
}

const getUserId = (arrayJSON) =>{
  let resultJSON = []
  for(var i = 0; i < arrayJSON.length; i++) {

    var objectJSON = {
      _id: arrayJSON[i]._id,
    }
    resultJSON[i] = objectJSON
}
  return resultJSON

}

const PendingList = React.createClass({


  getInitialState() {
    this.getPendingList()

    return {
      filteredInfo: null,
      sortedInfo: null,
      value: '',
      data: [],
      selected: []
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
  getPendingList(){
    apiAccess({
      url: 'http://localhost:8000/pending',
      method: 'GET',
      attemptAction: () => this.props.dispatch({ type: 'GET_PENDING_USER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_PENDING_USER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_PENDING_USER__FAILED' })
    })
  },

  approvedUser(selectedRows,props){

    if(selectedRows!=null){
      confirm({
        title: "Are you sure to approve these users",
        content: "you can not change the aprovement again",
        onOk() {
          let result_id = getUserId(selectedRows)
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!")
          console.log(result_id)
          apiAccess({
            url: 'http://localhost:8000/staffs/activate-pending-staffs',
            method: 'POST',
            payload: result_id,
            attemptAction: () => props.dispatch({ type: 'APPROVE_PENDING_USER_ATTEMPT' }),
            successAction: (json) => props.dispatch({ type: 'APPROVE_PENDING_USER_SUCCESS', json }),
            failureAction: () => props.dispatch({ type: 'APPROVE_PENDING_USER__FAILED' })
          })

        },
        onCancel() {},
      });
    }else{

    }

  },



  componentWillReceiveProps(nextProps){

    if(this.props.pendingUsers !== nextProps.pendingUsers){
      pendingUserData(nextProps.pendingUsers)
      this.setState({data: pendingUserData(nextProps.pendingUsers)})
    }
  
  },


  render() {

    //table
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selected: selectedRows})
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {

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

        <Row>
          <SearchAutoSuggest data = {this.state.data} value = {this.state.value}/>
          <Col span = {22} offset={22} >
            <Button type="primary" onClick ={()=>this.approvedUser(this.state.selected,this.props)}>Approve</Button>
        </Col>
        </Row>

      </div>

      <div className = "guide-container">
        <div className="table-operations">
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
      </div>
    </div>
    );
  },
});

function mapStateToProps(state) {

    return {
        guideDetail: state.guideDetail,
        input: state.search.search_input,
        pendingUsers: state.pendingUser.pendingUsers,
        approvedUser: state.pendingApproved.approvedUser,
        session: state.login.session
    };
}

export default connect(mapStateToProps)(PendingList)
