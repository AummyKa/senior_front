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
      fullDayClicked: false,
      guideUnavailableDates:[]
    }
  }

  choosingDate(start){
    let strDate = start.toString().substring(0,15)
    let date = changeDateFormat(strDate)
    this.setState({selectedDate:date})
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

  getGuideUnAvailibility(){
    let id = Cookies.get('guide_id')
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides/calendar/unavailability/'+id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_UNAVAIL_DATE_EACH_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_UNAVAIL_DATE_EACH_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_UNAVAIL_DATE_EACH_GUIDE_FAILED' })
    })
  }

  eventStyleGetter(event, start, end, isSelected) {

  let backgroundColor = event.hexColor
  let title = event.title

  if(title.match('Morning')){
    backgroundColor = '#' + 'ffc508';
  }else if(title.match('Afternoon')){
    backgroundColor = '#' + 'ff5733';
  }else if(title.match('Evening')){
    backgroundColor = '#' + '3b9df9';
  }else if(title.match('Full-Day')){
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
    if(this.props.allUnAvailDateEachGuide !== nextProps.allUnAvailDateEachGuide){
      if(nextProps.allUnAvailDateEachGuide){
        console.log(nextProps.allUnAvailDateEachGuide)
        this.setState({guideUnavailableDates:nextProps.allUnAvailDateEachGuide})
      }
    }
  }

  componentWillMount(){
    this.getGuideUnAvailibility()
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
                events = {this.state.guideUnavailableDates}
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
                  <Button className = "btn-submit-avail" type = "primary" onClick = {() => this.submitUnAvailability()}> Submit</Button>
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
        addUnAvailDateEachGuideStatus: state.addUnAvailDateEachGuide.addUnAvailDateEachGuideStatus,
        allUnAvailDateEachGuide: state.getAllUnAvailDateEachGuide.allUnAvailDateEachGuide
      }
}


export default connect(mapStateToProps)(GuideTimetable)
