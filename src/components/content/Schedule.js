import React, { Component } from 'react';
import { connect } from 'react-redux'
// import ShowCalendar from '../ShowCalendar'
import BigCalendar from 'react-big-calendar';

import moment from 'moment';
import events from '../Events';
import SlotDetail from './SlotDetail'
import AddTourForm from '../AddTourForm'
import EditTourForm from '../EditTourForm'


import{ Row,Col } from 'antd'
import { Modal , Button, ButtonToolbar } from 'react-bootstrap';

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
      selectedTourName: ""
    }
  }

  showThatSlot(slotInfo){
    let start = slotInfo.start.toString().substring(0,15)
    console.log(start)
    this.setState({selectedDate: start})
    console.log(this.state.selectedDate)
    this.setState({showSlotDetail : true})
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.showAddTourModal){
      this.setState({showEachTour: false, showAddTour:true,showSlotDetail : false})
    }else
      this.setState({showEachTour: false, showAddTour:false,showSlotDetail : true})


    if(this.props.addBookerAndTour !== nextProps.addBookerAndTour){
      if(nextProps.addBookerAndTour){
        this.setState({showEachTour: false, showAddTour:false,showSlotDetail : true})
      }else
        this.setState({showEachTour: false, showAddTour:true,showSlotDetail : false})
    }

    if(nextProps.eachTourState){
      this.setState({showEachTour: true, showAddTour:false,showSlotDetail : false})
    }
    if(nextProps.eachTour){
      this.setState({selectedTourName: nextProps.eachTour.tour_name})
    }
  }

  render() {
    let closeSlot = () => this.setState({showSlotDetail: false, showEachTour: false});
    let closeAddTour = () => this.setState({showAddTour: false,showSlotDetail: true ,showEachTour:false});
    let closeEachTour = () => this.setState({showEachTour: false,showSlotDetail: true, showAddTour:false});

    return (

      <div>
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

                <AddTourForm selectedDate = {this.props.selectedDate}  dispatch = {this.props.dispatch} />

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
                  <EditTourForm eachTour = {this.state.eachTour} />
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
              <SlotDetail selectedDate = {this.state.selectedDate}  dispatch = {this.props.dispatch} />
            </Modal.Body>

          </Modal>
      </div>

        <div className = "button-filter-schedule">
          <ButtonToolbar>
               <Button bsSize="large">All</Button>
               <Button bsSize="large">Guide</Button>
               <Button bsSize="large">Tour</Button>
               <Button bsSize="large">Transfer</Button>
               <Button bsSize="large">Tuk-Tuk</Button>
          </ButtonToolbar>
        </div>

      <div className = "topic">
          <h2>Schedule</h2>
      </div>

      <div className = "big-table">
          <h3 className='callout'>
          </h3>
          <BigCalendar
            selectable
        {...this.props}
        culture='en-GB'
        events={events}
        views={['month']}
        onSelectSlot={(slotInfo) => this.showThatSlot(slotInfo)}/>
        </div>
      </div>


    );
  }
}


const mapStateToProps = (state) => ({
  showAddTourModal: state.addTourForm.showAddTourModal,
  dateTour:state.addTourForm.dateTour,
  addBookerAndTour: state.postBookerAndTour.addBookerAndTour,
  eachTourState: state.editSpecificTour.eachTourState,
  eachTour: state.editSpecificTour.eachTour
})

export default connect(mapStateToProps)(Schedule)
