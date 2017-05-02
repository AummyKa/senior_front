import React, { Component } from 'react';
// import { Row,Col,Radio,Button,Input, DatePicker,Form } from 'antd';
import {connect} from 'react-redux';

import { Row,Col,Button, Input, Tag } from 'antd';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
import DayPicker, { DateUtils } from 'react-day-picker';
import changeDateFormat from '../../Helpers/changeDateFormat'

import 'react-day-picker/lib/style.css';
import '../../../public/css/eachguide-calendar.css'
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment);

const today = new Date()

const events = [
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2015, 3, 12,14, 0, 0, 0),
    'end': new Date(2015, 3, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  }
]


const range = DateUtils.addDayToRange(today,);


class GuideTimetable extends Component {

  constructor(props){
    super(props)
    this.state = {
      startdate: "",
      amount_of_workTours: "",
      month: new Date(),
      selectedDate: '',
      morningClicked: false,
      afternoonClicked: false,
      eveningClicked: false,
      fullDayClicked: false
    }
  }

  choosingDate(start){

    let strDate = start.toString().substring(0,15)
    let date = changeDateFormat(strDate)
    this.setState({selectedDate:date})
  }

  eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '25px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    }
    return {
        style: style
    }
}


  handleUnavailClicked(type){
    switch (type) {
      case 'morning':
      this.setState({morningClicked:true,fullDayClicked:false})
      break;

      case 'afternoon':
      this.setState({afternoonClicked:true,fullDayClicked:false})
      break;

      case 'evening':
      this.setState({eveningClicked:true,fullDayClicked:false})
      break;

      case 'full-day':
      this.setState({fullDayClicked:true,eveningClicked:false,afternoonClicked:false,morningClicked:false})
      break;

      default:
        return ''
      }
  }

  handleTagClose(tag){
    switch (tag) {
      case 'morning':
      this.setState({morningClicked:false})
      break;

      case 'afternoon':
      this.setState({afternoonClicked:false})
      break;

      case 'evening':
      this.setState({eveningClicked:false})
      break;

      case 'full-day':
      this.setState({fullDayClicked:false,eveningClicked:false,afternoonClicked:false,morningClicked:false})
      break;

      default:
        return ''
      }
  }


  render() {

    const modifiers={
        future: { after: new Date() }
    }

    return (
      <div>
        <div className = "guide-content" >
          <Row justify="space-between">
              <Col span={16}>
                <div className = "guide-calendar">
                { /*  <DayPicker
                    modifiers={ modifiers }
                    numberOfMonths={ 2 }
                    selectedDays={ this.state.selectedDays }
                    onDayClick={ this.handleDayClick }
                    enableOutsideDays ={true}
                    disabledDays={{ before: today, not: today }}
                  />*/}

                  <BigCalendar
                    selectable
                {...this.props}
                events = {events}
                culture='en-GB'
                eventPropGetter={(this.eventStyleGetter)}
                views={['month']}
                onSelectSlot={(slotInfo) => this.choosingDate(slotInfo.start)}/>

              </div>
              </Col>

            <Col span={8}>
              <div className = "edit-calendar">
                <div className = "selectedDay">
                  <h4>Selected Day</h4>
                  <Input
                     size="large"
                     style={{ fontSize: 20 ,width: 150, textAlign: 'center' }}
                     type="text"
                     value={this.state.selectedDate}
                     placeholder="YYYY-MM-DD"
                     onChange={this.handleInputChange}
                     onFocus={this.showCurrentDate}
                     width = {120}
                   />
                </div>
                <div className = "unavail-time">
                  <h4>Unavailable time</h4>

                  

                  { this.state.morningClicked ?
                    <Tag closable={true} color="#FFC300" afterClose={() => this.handleTagClose("morning")}>Morning</Tag> : null
                  }
                  { this.state.afternoonClicked ?
                    <Tag closable={true} color="#FF5733" afterClose={() => this.handleTagClose("afternoon")}>Afternoon</Tag> : null
                  }
                  { this.state.eveningClicked ?
                    <Tag closable={true} color="#3B9DF9" afterClose={() => this.handleTagClose("evening")}>Evening</Tag> : null
                  }
                  { this.state.fullDayClicked ?
                    <Tag closable={true} color="#581845" afterClose={() => this.handleTagClose("full-day")}>Full Day</Tag> : null
                  }

                </div>
                <div className = "combo-button">
                  <Row gutter = {16}>
                    <Col span = {10}><Button className = "Morning-btn" onClick ={()=> this.handleUnavailClicked("morning")}>
                      <h4>Morning</h4></Button></Col>
                    <Col span = {10}><Button className = "Afternoon-btn" onClick ={()=> this.handleUnavailClicked("afternoon")}>
                      <h4>Afternoon</h4></Button></Col>
                    <Col span = {10}><Button className = "Evening-btn" onClick ={()=> this.handleUnavailClicked("evening")}>
                      <h4>Evening</h4></Button></Col>
                    <Col span = {10}><Button className = "Fullday-btn" onClick ={()=> this.handleUnavailClicked("full-day")}>
                      <h4>Fullday</h4></Button></Col>
                  </Row>
                </div>
                <div className = "submit-avail-btn">
                  <Button style = {{backgroundColor: '#051E37' ,color: '#ffffff'}}>Submit</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </div>

    );
  }
}

function mapStateToProps(state) {

    return {

      }
}


export default connect(mapStateToProps)(GuideTimetable)
