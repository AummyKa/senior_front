import React, { Component } from 'react';
// import { Row,Col,Radio,Button,Input, DatePicker,Form } from 'antd';
import {connect} from 'react-redux';

import { Row,Col,Button, Input, Tag } from 'antd';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
import changeDateFormat from '../../Helpers/changeDateFormat'

import Cookies from 'js-cookie'
import apiAccess from '../../Helpers/apiAccess'

import 'react-day-picker/lib/style.css';
import '../../../public/css/eachguide-calendar.css'
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment);

const today = new Date()

const events = [
  {
    'title': 'MOR',
    'start': new Date(2015, 3, 10),
    'end': new Date(2015, 3, 10)
  },
  {
    'title': 'AFT',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },

  {
    'title': 'EVE',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'FULL',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'MOR',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    'title': 'EVE',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'MOR',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'AFT',
    'start':new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'AFT',
    'start':new Date(2015, 3, 12,14, 0, 0, 0),
    'end': new Date(2015, 3, 12,15, 0, 0, 0)
  },
  {
    'title': 'MOR',
    'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'EVE',
    'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'FULL',
    'start':new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  }
]


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

    if(this.state.morningClicked && this.state.afternoonClicked && type == "evening"){
      this.setState({fullDayClicked:true,eveningClicked:false,afternoonClicked:false,morningClicked:false})

    }else if(this.state.eveningClicked && this.state.afternoonClicked && type == "morning"){
      this.setState({fullDayClicked:true,eveningClicked:false,afternoonClicked:false,morningClicked:false})

    }else if(this.state.eveningClicked && this.state.morningClicked && type == "afternoon"){
      this.setState({fullDayClicked:true,eveningClicked:false,afternoonClicked:false,morningClicked:false})

    }else{
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
  }

  getAllUnAvailability(selectedDated){

    let arr = []

    if(this.state.morningClicked){
      arr.push("Morning")
    }
    if(this.state.afternoonClicked){
      arr.push("Afternoon")
    }
    if(this.state.eveningClicked){
      arr.push("Evening")
    }

    if(arr.length == 3){
      arr.splice(0,arr.length)
      arr.push("Full-Day")
    }


    var unAvailObj = {};
      for (var x = 0; x < arr.length; x++) {
        unAvailObj[x] =
            {
              date: selectedDated,
              time_period: arr[x]
            };
      }

    return unAvailObj
  }

  submitUnAvailability(){

    let id = Cookies.get('guide_id')
    let unAvailList = this.getAllUnAvailability(this.state.selectedDate)

    console.log(unAvailList)

    apiAccess({
      url: 'http://localhost:8000/staffs/add-unavailability/'+id,
      method: 'POST',
      payload: unAvailList,
      attemptAction: () => this.props.dispatch({ type: 'ADD_UNAVAIL_DATE_EACH_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'ADD_UNAVAIL_DATE_EACH_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'ADD_UNAVAIL_DATE_EACH_GUIDE_FAILED' })
    })

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

  componentWillReceiveProps(nextProps){
    console.log(nextProps.addUnAvailDateEachGuideStatus)
    if(this.props.addUnAvailDateEachGuideStatus !== nextProps.addUnAvailDateEachGuideStatus){
      if(nextProps.addUnAvailDateEachGuideStatus){

      }
    }
  }

  eventStyleGetter(event, start, end, isSelected){
    console.log(event);

    let backgroundColor = '#' + event.hexColor;

    if(event.title == "MOR"){
      backgroundColor = '#' + 'ffc300';
    }else if(event.title == "AFT"){
      backgroundColor = '#' + 'ff5733';
    }else if(event.title == "EVE"){
      backgroundColor = '#' + '3b9df9'
    }else if(event.title == "FULL"){
      backgroundColor = '#' + '581845';
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

                  <BigCalendar
                    selectable
                {...this.props}
                events = {events}
                culture='en-GB'
                eventPropGetter={(this.eventStyleGetter)}
                views={['month']}
                onSelectSlot={(slotInfo) => this.choosingDate(slotInfo.start)}
              />

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

                  { !this.state.morningClicked && !this.state.afternoonClicked && !this.state.eveningClicked && !this.state.fullDayClicked
                    ? <Tag color="#68EA22">Available All Day</Tag> : null
                  }

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
                <div className = "submit-avail-button">
                  <Button className = "submit-avail-btn" type = "primary" onClick = {() => this.submitUnAvailability()}> Submit</Button>
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
        addUnAvailDateEachGuideStatus: state.addUnAvailDateEachGuide.addUnAvailDateEachGuideStatus
      }
}


export default connect(mapStateToProps)(GuideTimetable)
