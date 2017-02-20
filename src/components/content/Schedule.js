import React, { Component } from 'react';

// import ShowCalendar from '../ShowCalendar'
import BigCalendar from 'react-big-calendar';

import moment from 'moment';
import events from '../Events';
import SlotDetail from './SlotDetail'

import{ Row,Col } from 'antd'
import { Modal , Button, ButtonGroup } from 'react-bootstrap';

require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment);
class Schedule extends Component {

  constructor(props){
    super(props)
    this.state = {
      showSlotDetail : false
    }
  }

  AddTour(slotInfo){
    console.log(slotInfo.start)
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
              <Modal.Title id="contained-modal-title">Tour lists</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <SlotDetail />
            </Modal.Body>

          </Modal>
        </div>

      <div className = "topic">
        <Row>
          <Col span={6}>
            <h2>Schedule</h2>
          </Col>
          <Col span={8} offset={4}>
            <ButtonGroup>
             <Button>Summary Schedule</Button>
             <Button>Tour Schedule</Button>
           </ButtonGroup>
          </Col>
      </Row>

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
        onSelectSlot={(slotInfo) => this.AddTour(slotInfo)}/>
        </div>
      </div>


    );
  }
}



export default Schedule
