import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { AutoComplete, Row,Col,Table, Input, Button,Popover, Popconfirm } from 'antd';
import { Modal } from 'react-bootstrap'

import apiAccess from '../../Helpers/apiAccess'

import AddAgencyModal from '../AddAgencyModal'
import EditAgencyModal from '../EditAgencyModal'
import AddBookingMethodsModal from '../AddBookingMethodsModal'
import EditBookingMethodsModal from '../EditBookingMethodsModal'

import Cookies from 'js-cookie'


const agencyData = (arrayJSON) =>{

  let resultJSON = []
  let count = 0
  if(arrayJSON && arrayJSON.length > 0){
    for(let i =0;i<arrayJSON.length;i++){
      if(arrayJSON[i].type == "Agency"){

        var arr ={
          name: arrayJSON[i].name,
          email: arrayJSON[i].email,
          phone: arrayJSON[i].phone,
          description: arrayJSON[i].description,
          key: count
        }
        resultJSON.push(arr)
        count++
      }
    }
  }
  return resultJSON
}

const bookingMethodData = (arrayJSON) =>{

  let resultJSON = []
  let count = 0
  if(arrayJSON && arrayJSON.length > 0){
    for(let i =0;i<arrayJSON.length;i++){
      if(arrayJSON[i].type == "Individual"){
        arrayJSON[count]["key"] = count;
        resultJSON[count] = arrayJSON[i]
        count++
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
      selectedBookingMethod:'',
      agencyLists:[],
      bookingMethodLists:[],
      showAddBookedMethodsModal: false,
      showAddAgencyModal:false,
      showEditBookingMethodsModal:false
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
      url: 'bookingmethods/',
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
        let agencyLists = agencyData(nextProps.bookingMethodLists)
        let bookingMethodLists = bookingMethodData(nextProps.bookingMethodLists)
        this.setState({agencyLists:agencyLists})
        this.setState({bookingMethodLists:bookingMethodLists})
      }
    }

    if(this.props.updateBookingMethodsStatus !== nextProps.updateBookingMethodsStatus){
      if(nextProps.updateBookingMethodsStatus){
        this.setState({showEditAgencyModal: false})
        this.setState({showEditBookingMethodsModal:false})
        this.getBookingMethods()
      }
    }

    if(this.props.deleteBookingMethodsStatus !== nextProps.deleteBookingMethodsStatus){
      if(nextProps.deleteBookingMethodsStatus){
        this.getBookingMethods()
      }
    }

    if(this.props.addBookingMethodStatus !== nextProps.addBookingMethodStatus){
      if(nextProps.addBookingMethodStatus){
        this.setState({showAddAgencyModal:false})
        this.setState({showAddBookingMethodsModal:false})
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
    this.setState({selectedBookingMethod: record})
    this.setState({showEditAgencyModal: true})
  }

  editBookingMethod(record){
    console.log(record)
    this.setState({selectedBookingMethod: record})
    this.setState({showEditBookingMethodsModal: true})
  }

  deleteBookingMethod(record){
    apiAccess({
      url: 'bookingmethods/delete/'+record._id,
      method: 'DELETE',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'DELETE_BOOKING_METHOD_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'DELETE_BOOKING_METHOD_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'DELETE_BOOKING_METHOD_FAILED' })
    })
  }

  showAddAgencyModal(){
    this.setState({showAddAgencyModal:true})
  }

  showAddBookingMethods(){
    this.setState({showAddBookingMethodsModal:true})
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
      title: 'E-mail',
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
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    { title: 'Action', dataIndex: '', key: 'x', width: 150,
      render: (text, record) =>
      <span>
          <Button type = "primary" onClick = {() => this.editAgency(record)} >Edit</Button>
          <span className="ant-divider" />
          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
            onConfirm = {() => this.deleteBookingMethod(record)}>
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
          <Button type = "primary" onClick = {() => this.editBookingMethod(record)} >Edit</Button>
          <span className="ant-divider" />
          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
            onConfirm = {() => this.deleteBookingMethod(record)}>
            <Button type="danger">Delete</Button>
          </Popconfirm>
      </span>
    }]

    let closeAddAgencyModal = () => { this.setState({showAddAgencyModal: false}) }
    let closeEditAgencyModal = () => { this.setState({showEditAgencyModal: false}) }
    let closeAddBookingMethodsModal = () => { this.setState({showAddBookingMethodsModal: false}) }
    let closeEditBookingMethodsModal = () => { this.setState({showEditBookingMethodsModal:false }) }

    let agency_title = "Add New Agency"
    let bookingMethod_title = "Add New Booking Method"
    let edit_title = "Edit Agency"

    return (

      <div className="booking-method-wrapper">

        <div className="modal-container" >
          <Modal
            show={this.state.showAddBookingMethodsModal}
            onHide={closeAddBookingMethodsModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">{bookingMethod_title}</Modal.Title>
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
              <Modal.Title id="contained-modal-title">{agency_title}</Modal.Title>
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
              <EditAgencyModal dispatch = {this.props.dispatch} selectedBookingMethod = {this.state.selectedBookingMethod}  />
            </Modal.Body>

          </Modal>
        </div>

        <div className="modal-container" >
          <Modal
            show={this.state.showEditBookingMethodsModal}
            onHide={closeEditBookingMethodsModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">{edit_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditBookingMethodsModal dispatch = {this.props.dispatch} selectedBookingMethod = {this.state.selectedBookingMethod}  />
            </Modal.Body>

          </Modal>
        </div>


        <div className = "topic">
            <h2>Booking Methods</h2>
        </div>

        <div className="booking-method-table" style ={{marginTop: '3%'}} >
          <Row>
            <Col span = {5}>
              <h4><b>Individual Booking</b></h4>
            </Col>
            <Col span = {8}>
              <Button type = "primary" onClick = {() => this.showAddBookingMethods()} >Add More Methods</Button>
            </Col>
          </Row>
          <Table columns={generalColumns}
            dataSource={this.state.bookingMethodLists}
            onChange={this.handleChange}
            />
        </div>

        <div className = "agency-table" style = {{marginTop: '5%'}}>
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
      updateBookingMethodsStatus: state.updateBookingMethods.updateBookingMethodsStatus,
      deleteBookingMethodsStatus: state.deleteBookingMethods.deleteBookingMethodsStatus,
      bookingMethodLists: state.getBookingMethods.bookingMethodLists,
      addBookingMethodStatus: state.addBookingMethods.addBookingMethodStatus
    };
}

export default connect(mapStateToProps)(BookingMethod)
