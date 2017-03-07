import React, { Component } from 'react';

// import ShowCalendar from '../ShowCalendar'
import BigCalendar from 'react-big-calendar';

import moment from 'moment';
import events from '../Events';
import SlotDetail from './SlotDetail'

import{ Row,Col } from 'antd'
import { Modal , Button, ButtonToolbar } from 'react-bootstrap';

require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment);
class Schedule extends Component {

  constructor(props){
    super(props)
    this.state = {
      showSlotDetail : false,
      selectedDate: ""
    }
  }

  showThatSlot(slotInfo){
    let start = slotInfo.start.toString().substring(0,15)
    console.log(start)
    this.setState({selectedDate: start})
    console.log(this.state.selectedDate)
    this.setState({showSlotDetail : true})
  }


  render() {
    let close = () => this.setState({showSlotDetail: false});

    return (

      <div>

        <div className="modal-container" >

          <Modal
            bsSize = "large"
            aria-labelledby="contained-modal-title-lg"
            show={this.state.showSlotDetail}
            onHide={close}
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



export default Schedule
