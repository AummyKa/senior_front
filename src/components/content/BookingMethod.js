import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { AutoComplete, Row,Col,Table, Input, Button,Popover, Popconfirm } from 'antd';
import { Modal } from 'react-bootstrap'

import apiAccess from '../../Helpers/apiAccess'

import AddAgencyModal from '../AddAgencyModal'
import EditAgencyModal from '../EditAgencyModal'
import AddBookingMethodsModal from '../AddBookingMethodsModal'

import Cookies from 'js-cookie'


const agencyData = (arrayJSON) =>{
  let resultJSON = []
  if(arrayJSON && arrayJSON.length > 0){
    for(let i =0;i<arrayJSON.length;i++){
      if(arrayJSON[i].type == "Agency"){
        arrayJSON[i]["key"] = i;
        resultJSON[i] = arrayJSON[i]
      }
    }
  }
  return resultJSON
}

const bookingMethodData = (arrayJSON) =>{
  let resultJSON = []
  if(arrayJSON && arrayJSON.length > 0){
    for(let i =0;i<arrayJSON.length;i++){
      if(arrayJSON[i].type == "Individual"){
        arrayJSON[i]["key"] = i;
        resultJSON[i] = arrayJSON[i]
      }
    }
  }
  return resultJSON
}


class BookingMethod extends Component{

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
      bookingMethodLists:[],
      agencyLists:[],
      showAddBookedMethodsModal: false,
      showAddAgencyModal:false
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

  getBookingMethods(){
    apiAccess({
      url: 'http://localhost:8000/bookingmethods/',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_BOOKING_METHODS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_BOOKING_METHODS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_BOOKING_METHODS_FAILED' })
    })
  }

  componentWillReceiveProps(nextProps){

    if(this.props.bookingMethodLists !== nextProps.bookingMethodLists){
      if(nextProps.bookingMethodLists){
        console.log(nextProps.bookingMethodLists)
        let agencyLists = agencyData(nextProps.bookingMethodLists)
        this.setState({agencyLists:agencyLists})
        let bookingMethodLists = bookingMethodData(nextProps.bookingMethodLists)
        this.setState({bookingMethodLists:bookingMethodLists})
      }
    }

    if(this.props.updateAgencyDataStatus !== nextProps.updateAgencyDataStatus){
      if(nextProps.updateAgencyDataStatus){
        this.setState({showEditAgencyMadal: false})

      }
    }

    if(this.props.deleteAgencyDataStatus !== nextProps.deleteAgencyDataStatus){
      if(nextProps.deleteAgencyDataStatus){

      }
    }

    if(this.props.addBookingMethodStatus !== nextProps.addBookingMethodStatus){
      if(nextProps.addBookingMethodStatus){
        this.setState({showAddAgencyModal:false})
        this.getBookingMethods()
      }
    }
  }


  componentWillMount(){
    this.getBookingMethods()
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

  showAddAgencyModal(){
    this.setState({showAddAgencyModal:true})
  }

  showAddBookedMethods(){
    this.setState({showAddBookedMethodsModal:true})
  }

  render() {

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Agency Name',
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

    const generalColumns = [{
      title: 'Title',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

    let closeAddAgencyModal = () => { this.setState({showAddAgencyModal: false}) }
    let closeEditAgencyModal = () => { this.setState({showEditAgencyMadal: false}) }
    let closeAddBookedMethodsModal = () => { this.setState({showAddBookedMethodsModal: false}) }

    let title = "Add New Agency"
    let edit_title = "Edit Agency"

    return (

      <div>

        <div className="modal-container" >
          <Modal
            show={this.state.showAddBookedMethodsModal}
            onHide={closeAddBookedMethodsModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddBookingMethodsModal dispatch = {this.props.dispatch} />
            </Modal.Body>

          </Modal>
        </div>

        <div className="modal-container" >
          <Modal
            show={this.state.showAddAgencyModal}
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
            show={this.state.showEditAgencyModal}
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
            <h2>Booking Methods</h2>
        </div>

        <div className="booking-method-table" style ={{marginTop: '5%'}} >
          <Row>
            <Col span = {5}>
              <h4><b>Booking Individually</b></h4>
            </Col>
            <Col span = {8}>
              <Button type = "primary" onClick = {() => this.showAddBookedMethods()} >Add More Methods</Button>
            </Col>
          </Row>
          <Table columns={generalColumns}
            dataSource={this.state.bookingMethodLists}
            onChange={this.handleChange}
            />
        </div>

        <div className = "agency-table" style ={{marginTop: '5%'}} >
          <Row>
            <Col span = {4} >
              <h4><b>Agency</b></h4>
            </Col>
            <Col span = {8} offset={1}>
              <Button type = "primary" onClick = {() => this.showAddAgencyModal()}>Add More Agency</Button>
            </Col>
          </Row>

          <div className="table-operations">
            <Table columns={columns}
              dataSource={this.state.agencyLists}
              onChange={this.handleChange}
              />
          </div>
        </div>

  </div>
    );
  }
}

function mapStateToProps(state) {

    return {
      updateAgencyDataStatus: state.updateAgency.updateAgencyDataStatus,
      deleteAgencyDataStatus: state.deleteAgency.deleteAgencyDataStatus,
      bookingMethodLists: state.getBookingMethods.bookingMethodLists,
      addBookingMethodStatus: state.addBookingMethods.addBookingMethodStatus
    };
}

export default connect(mapStateToProps)(BookingMethod)
