import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { AutoComplete, Row,Col,Table, Input, Button,Popover, Popconfirm } from 'antd';
import { Modal } from 'react-bootstrap'

import apiAccess from '../../Helpers/apiAccess'

import AddAgencyModal from '../AddAgencyModal'
import EditAgencyModal from '../EditAgencyModal'

import Cookies from 'js-cookie'



const clearAgencyData = (arrayJSON) =>{
  let resultJSON = []
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {

      var objectJSON = {
        key: i,
        _id: arrayJSON[i]._id,
        agencyName: arrayJSON[i].agency_name,
        email: arrayJSON[i].email,
        phone: arrayJSON[i].phone
      }

      resultJSON[i] = objectJSON
  }
    return resultJSON
}else {
  return resultJSON
}

}

class Agency extends Component{

  constructor(props) {
    super(props)

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      value: '',
      agencyData:[],
      showAddAgencyMadal: false,
      showEditAgencyMadal: false,
      selectedAgency:'',
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleChange(pagination, filters, sorter) {

    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  eachAgency(event, index){
    console.log(event)
    // let id = event._id
    // Cookies.set('guide_id',id)
    // this.context.router.push('/guide/'+id);
  }

  getAgencyList(){
    apiAccess({
      url: 'http://localhost:8000/agencies',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_AGENCY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_AGENCY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_AGENCY_FAILED' })
    })

  }
  componentWillReceiveProps(nextProps){
  
    if(this.props.agencyData !== nextProps.agencyData){
      if(nextProps.agencyData){
        console.log(nextProps.agencyData)
        this.setState({agencyData: nextProps.agencyData})
      }
    }

    if(this.props.addAgencyDataStatus !== nextProps.addAgencyDataStatus){
      if(nextProps.addAgencyDataStatus){
        this.setState({showAddAgencyMadal: false})
        this.getAgencyList()
      }
    }

    if(this.props.updateAgencyDataStatus !== nextProps.updateAgencyDataStatus){
      if(nextProps.updateAgencyDataStatus){
        this.setState({showEditAgencyMadal: false})
        this.getAgencyList()
      }
    }

    if(this.props.deleteAgencyDataStatus !== nextProps.deleteAgencyDataStatus){
      if(nextProps.deleteAgencyDataStatus){
        this.getAgencyList()
      }
    }
  }


  componentWillMount(){
    this.getAgencyList()
  }

  addAgency(){
    this.setState({showAddAgencyMadal: true})
  }

  editAgency(record){
    console.log(record)
    this.setState({selectedAgency: record})
    this.setState({showEditAgencyMadal: true})

  }

  deleteAgency(record){
    apiAccess({
      url: 'http://localhost:8000/agencies/delete/'+record._id,
      method: 'DELETE',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'DELETE_AGENCY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'DELETE_AGENCY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'DELETE_AGENCY_FAILED' })
    })
  }

  render() {

    console.log(this.state.selectedAgency)

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Agency Name',
      dataIndex: 'agencyName',
      key: 'agencyName',
      filteredValue: filteredInfo.agencyName || null,
      onFilter: (value, record) => record.agencyName.includes(value),
      sorter: (a, b) => a.agencyName.length - b.agencyName.length,
      sortOrder: sortedInfo.columnKey === 'agencyName' && sortedInfo.order,
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

      filteredValue: filteredInfo.email|| null,
      onFilter: (value, record) => record.email.includes(value),
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },{
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',

      filteredValue: filteredInfo.phone|| null,
      onFilter: (value, record) => record.phone.includes(value),
      sorter: (a, b) => a.phone.length - b.phone.length,
      sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order,
    },

    { title: 'Action', dataIndex: '', key: 'x', width: 150,
      render: (text, record) =>
      <span>
          <Button type = "primary" onClick = {() => this.editAgency(record)} >Edit</Button>
          <span className="ant-divider" />
          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
            onConfirm = {() => this.deleteAgency(record)}>
            <Button type="danger">Delete</Button>
          </Popconfirm>
      </span>
    }]

    let closeAddAgencyModal = () => { this.setState({showAddAgencyMadal: false}) }
    let closeEditAgencyModal = () => { this.setState({showEditAgencyMadal: false}) }

    let title = "Add New Agency"
    let edit_title = "Edit Agency"

    return (

      <div>

        <div className="modal-container" >
          <Modal
            show={this.state.showAddAgencyMadal}
            onHide={closeAddAgencyModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddAgencyModal dispatch = {this.props.dispatch} />
            </Modal.Body>

          </Modal>
        </div>

        <div className="modal-container" >
          <Modal
            show={this.state.showEditAgencyMadal}
            onHide={closeEditAgencyModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">{edit_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditAgencyModal dispatch = {this.props.dispatch} selectedAgency = {this.state.selectedAgency}  />
            </Modal.Body>

          </Modal>
        </div>


        <div className = "topic">
          <h2>Agency</h2>
        </div>

        <div className = "guide-container">
          <div className="table-operations">
            <Table columns={columns}
              dataSource={clearAgencyData(this.state.agencyData)}
              onChange={this.handleChange}
              />
          </div>
        </div>

        <Button type = "dash" className = "btn-add-agency-form" onClick = {() => this.addAgency()}> + </Button>

  </div>
    );
  }
}

function mapStateToProps(state) {

    return {
      agencyData: state.getAgency.agencyData,
      addAgencyDataStatus: state.addAgency.addAgencyDataStatus,
      updateAgencyDataStatus: state.updateAgency.updateAgencyDataStatus,
      deleteAgencyDataStatus: state.deleteAgency.deleteAgencyDataStatus
    };
}

export default connect(mapStateToProps)(Agency)
