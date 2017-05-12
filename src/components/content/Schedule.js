import React, { Component } from 'react';
import { connect } from 'react-redux'
// import ShowCalendar from '../ShowCalendar'
import BigCalendar from 'react-big-calendar';

import moment from 'moment';

import SlotDetail from './SlotDetail'
import AddBookedTourForm from '../AddBookedTourForm'
import EditTourForm from '../EditTourForm'
import EditCurCustomerModal from '../EditCurCustomerModal'
import AddMoreCustomerModal from '../AddMoreCustomerModal'

import apiAccess from '../../Helpers/apiAccess'
import { getSelectedDate } from '../../actions/action-selectedDate'
import {editCustomerModal} from '../../actions/action-editCustomerModal'
import { addTour } from '../../actions/action-addTour'
import {addCustomerModal} from '../../actions/action-addCustomerModal'

import{ Row,Col } from 'antd'
import { Modal , Button, ButtonToolbar } from 'react-bootstrap';

import Cookies from 'js-cookie'

require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment);
class Schedule extends Component {

  constructor(props){
    super(props)
      this.state = {
      showSlotDetail : false,
      selectedDate: "",
      showAddTour: false,
      showEachTour: false,
      selectedTourName: "",
      events:[],
      selectedDate:"",
      receiveShowAddStatus:false,
      showCustomerEdit: false,
      editCurCustomer: [],
      showAddMoreCustomer: false,
      curTourID: '',
      addTourID: ''
    }
  }

  componentWillMount(){
    this.getEvent();
  }

  showThatSlot(start){
    this.props.dispatch(getSelectedDate("GET_SELECTED_DATE",start))
    this.setState({showSlotDetail : true})
  }

  getEvent(){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/calendar/public-private',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_EVENT_SUMMARY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_EVENT_SUMMARY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_EVENT_SUMMARY_FAILED' })
    })
  }

  eventStyleGetter(event, start, end, isSelected) {

  let backgroundColor = event.hexColor
  let title = event.title

  if(title.match('Public')){
    backgroundColor = '#' + '27c518';
  }else if(title.match('Private')){
    backgroundColor = '#' + 'fe4f1b';
  }
    let style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}


  componentWillReceiveProps(nextProps){

    if(this.props.showAddTourModal !== nextProps.showAddTourModal){
      if(nextProps.showAddTourModal){
        this.setState({showEachTour: false, showAddTour:true,showSlotDetail : false, showCustomerEdit:false, showAddMoreCustomer: false})
      }
    }

    if(this.props.eachTourState !== nextProps.eachTourState){
      if(nextProps.eachTourState){
        this.setState({showEachTour: true, showAddTour:false,showSlotDetail : false, showCustomerEdit:false, showAddMoreCustomer: false})
      }
    }

    if(this.props.eachTour !== nextProps.eachTour){
      if(nextProps.eachTour){
          this.setState({selectedTourName: nextProps.eachTour.tour_name})
          this.setState({curTourID: nextProps.eachTour._id})
          Cookies.set('cur_tour_id',nextProps.eachTour._id)
      }
    }
    if(nextProps.events){
      if(this.props.events !== nextProps.events){
        this.setState({events: nextProps.events})
      }
    }
    if(this.props.addBookerAndTour !== nextProps.addBookerAndTour){
      if(nextProps.addBookerAndTour){
          this.getEvent()
          this.setState({showEachTour: false, showAddTour:false,showSlotDetail : true, showCustomerEdit:false,showAddMoreCustomer: false})
          this.props.dispatch(addTour("CLOSE_ADD_TOUR"))
          // this.props.dispacth(addTour("STOP_COUNT_ADD_TOUR"))
      }
    }
    console.log(nextProps.delete_cus_status)
    if(this.props.delete_cus_status !== nextProps.delete_cus_status){
      this.getEvent()
      if(nextProps.delete_cus_status){
        // this.getEvent()
      }
    }

    if(nextProps.selectedDate){
        this.setState({selectedDate: nextProps.selectedDate})
    }
    if(this.props.showEditCustomer !== nextProps.showEditCustomer){
      console.log(nextProps.showEditCustomer)
      if(nextProps.showEditCustomer){
        this.setState({showEachTour: false, showAddTour:false, showSlotDetail: false,showCustomerEdit: true,showAddMoreCustomer: false})
      }
    }

    if(this.props.customerData !== nextProps.customerData){
      if(nextProps.customerData){
        this.setState({editCurCustomer: nextProps.customerData})
      }
    }

    if(this.props.showAddCustomer !== nextProps.showAddCustomer){
      if(nextProps.showAddCustomer){
        this.setState({showEachTour: false, showAddTour:false, showSlotDetail: false,showCustomerEdit: false,showAddMoreCustomer: true})
      }
    }

    console.log(nextProps.addTourID)
    if(this.props.addTourID !== nextProps.addTourID){
      if(nextProps.addTourID){
        this.setState({addTourID: nextProps.addTourID})
      }
    }

    if(this.props.addCustomerSuccess !== nextProps.addCustomerSuccess){
      if(nextProps.addCustomerSuccess){
        this.getEvent()
        this.setState({showEachTour: true, showAddTour:false,showSlotDetail: false, showCustomerEdit:false,showAddMoreCustomer: false})
        this.props.dispatch(addCustomerModal("CLOSE_ADD_CUSTOMER"))
      }
    }


    if(this.props.editCustomerInTourStatus !== nextProps.editCustomerInTourStatus){
      if(nextProps.editCustomerInTourStatus){
        this.setState({showEachTour: true, showAddTour:false,showSlotDetail: false, showCustomerEdit:false,showAddMoreCustomer: false})
        this.props.dispatch(editCustomerModal("CLOSE_EDIT_CUSTOMER"))
      }
    }

  }

  render() {

    let closeSlot = () => {
      this.setState({showSlotDetail: false, showEachTour: false, showAddTour: false, showCustomerEdit:false,showAddMoreCustomer: false})
    }

    let closeAddTour = () =>{
      this.setState({showAddTour: false,showSlotDetail: true ,showEachTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
      this.props.dispatch(addTour("CLOSE_ADD_TOUR"))
    }
    let closeEachTour = () =>{
      this.setState({showEachTour: false,showSlotDetail: true, showAddTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
    }

    let closeCustomerEdit = () => {
      this.setState({showEachTour: true,showSlotDetail: false, showAddTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
      this.props.dispatch(editCustomerModal("CLOSE_EDIT_CUSTOMER"))
    }

    let closeAddMoreCustomer = () => {
      this.setState({showEachTour: true,showSlotDetail: false, showAddTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
      this.props.dispatch(addCustomerModal("CLOSE_ADD_CUSTOMER"))
    }

    return (

      <div>

        <div className="modal-container" >
            <Modal
              show={this.state.showAddMoreCustomer}
              onHide={closeAddMoreCustomer}
              bsSize="lg"
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                  Add more Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddMoreCustomerModal dispatch = {this.props.dispatch} addTourID = {this.state.addTourID} />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container" >
            <Modal
              show={this.state.showCustomerEdit}
              onHide={closeCustomerEdit}
              bsSize="lg"
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                  Edit Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <EditCurCustomerModal eachCurCustomer ={this.state.editCurCustomer} curTourID = {this.state.curTourID}  />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container" >
            <Modal
              show={this.state.showAddTour}
              onHide={closeAddTour}
              bsSize = "large"
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Add Tour and Guide at {this.state.selectedDate}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <AddBookedTourForm dispatch = {this.props.dispatch} />

              </Modal.Body>

            </Modal>
          </div>

          <div className="modal-container" >
              <Modal
                show={this.state.showEachTour}
                onHide={closeEachTour}
                bsSize = "large"
                container={this}
                aria-labelledby="contained-modal-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">
                    {this.state.selectedTourName} at {this.state.selectedDate}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <EditTourForm eachTourData = {this.props.eachTour} />
                </Modal.Body>

              </Modal>
          </div>

      <div className="modal-container">
          <Modal
            bsSize = "lg"
            aria-labelledby="contained-modal-title-lg"
            show={this.state.showSlotDetail}
            onHide={closeSlot}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Tour lists at {this.state.selectedDate} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SlotDetail dispatch = {this.props.dispatch} />
            </Modal.Body>

          </Modal>
      </div>

      <div className = "schedule-container">
        <Row style = {{width: '100%'}}>
          <Row >

            <Col span = {6}>
              <div className = "topic">
                  <h2>Schedule</h2>
              </div>
            </Col>
            <Col span = {6} offset = {12}>
              <div className = "button-filter-schedule">
                <ButtonToolbar>
                     <Button bsStyle="info">All</Button>
                     <Button bsStyle="info">Guide</Button>
                     <Button bsStyle="info">Tour</Button>
                </ButtonToolbar>
              </div>
            </Col>
         </Row>

         <div className = "schedule-filter">

         </div>

          <Row>
            <Col span = {24} style = {{height: 500}}>
              <div className = "big-table">
                  <h3 className='callout'>
                  </h3>
                  <BigCalendar
                    selectable
                {...this.props}
                culture='en-GB'
                events={this.state.events}
                eventPropGetter={(this.eventStyleGetter)}
                views={['month']}
                onSelectSlot={(slotInfo) => this.showThatSlot(slotInfo.start)}/>
                </div>
            </Col>
            </Row>
          </Row>
        </div>


      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  editCustomerInTourStatus: state.editCustomerInTour.editCustomerInTourStatus,
  addCustomerSuccess: state.addNewCustomerInTour.addCustomerSuccess,
  addTourID: state.addCustomerModal.addTourID,
  showAddCustomer: state.addCustomerModal.showAddCustomer,
  showEditCustomer: state.editCustomerModal.showEditCustomer,
  customerData: state.editCustomerModal.customerData,
  showAddTourModal: state.addTourForm.showAddTourModal,
  dateTour:state.addTourForm.dateTour,
  addBookerAndTour: state.postBookerAndTour.addBookerAndTour,
  eachTourState: state.getSpecificBookedTour.eachTourState,
  eachTour: state.getSpecificBookedTour.eachTour,
  selectedDate: state.spreadSelectedDate.selectedDate,
  events: state.getEventSummary.events,
  delete_cus_status: state.deleteCurCustomerInTour.delete_cus_status
})

export default connect(mapStateToProps)(Schedule)
