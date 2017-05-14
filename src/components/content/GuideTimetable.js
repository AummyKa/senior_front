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
      guideUnavailableDates:[],
      eachGuideUnAvailableEachDate:[]
    }
  }

  choosingDate(start){
    let strDate = start.toString().substring(0,15)
    let date = changeDateFormat(strDate)
    let id = Cookies.get('guide_id')
    this.setState({selectedDate:date})

    apiAccess({
      url: 'http://localhost:8000/staffs/unavailability/'+id+'/'+date,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_EACH_GUIDE_UNAVAIL_EACH_DATE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_EACH_GUIDE_UNAVAIL_EACH_DATE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_EACH_GUIDE_UNAVAIL_EACH_DATE_FAILED' })
    })

  }

  handleUnavailClicked(type){

    if(this.state.morningClicked && this.state.afternoonClicked && type == "Evening"){
      this.setState({fullDayClicked:true,eveningClicked:false,afternoonClicked:false,morningClicked:false})

    }else if(this.state.eveningClicked && this.state.afternoonClicked && type == "Morning"){
      this.setState({fullDayClicked:true,eveningClicked:false,afternoonClicked:false,morningClicked:false})

    }else if(this.state.eveningClicked && this.state.morningClicked && type == "Afternoon"){
      this.setState({fullDayClicked:true,eveningClicked:false,afternoonClicked:false,morningClicked:false})

    }else{
      switch (type) {
        case 'Morning':
        this.setState({morningClicked:true,fullDayClicked:false})
        break;

        case 'Afternoon':
        this.setState({afternoonClicked:true,fullDayClicked:false})
        break;

        case 'Evening':
        this.setState({eveningClicked:true,fullDayClicked:false})
        break;

        case 'Full-Day':
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
    if(this.state.fullDayClicked){
      arr.push("Full-Day")
    }

    var result = [];
      for (var x = 0; x < arr.length; x++) {
      let  unAvailObj =
            {
              date: selectedDated,
              time_period: arr[x]
            };
        result.push(unAvailObj)
      }

    return result
  }

  submitUnAvailability(){

    let id = Cookies.get('guide_id')
    let unAvailList = this.getAllUnAvailability(this.state.selectedDate)

    console.log(unAvailList)

    apiAccess({
      url: 'http://localhost:8000/staffs/update-unavailability/'+id+'/'+this.state.selectedDate,
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
      case 'Morning':
      this.setState({morningClicked:false})
      break;

      case 'Afternoon':
      this.setState({afternoonClicked:false})
      break;

      case 'Evening':
      this.setState({eveningClicked:false})
      break;

      case 'Full-Day':
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
        this.getGuideUnAvailibility()
      }
    }
    if(this.props.allUnAvailDateEachGuide !== nextProps.allUnAvailDateEachGuide){
      if(nextProps.allUnAvailDateEachGuide){
        console.log(nextProps.allUnAvailDateEachGuide)
        this.setState({guideUnavailableDates:nextProps.allUnAvailDateEachGuide})
      }
    }
    if(this.props.eachGuideUnAvailableEachDate !== nextProps.eachGuideUnAvailableEachDate)
      if(nextProps.eachGuideUnAvailableEachDate){
        console.log(nextProps.eachGuideUnAvailableEachDate)
        this.setState({eachGuideUnAvailableEachDate:nextProps.eachGuideUnAvailableEachDate})
        this.showUnAvailableTime(nextProps.eachGuideUnAvailableEachDate)
      }
  }

  componentWillMount(){
    this.getGuideUnAvailibility()
  }

  showUnAvailableTime(time){
    console.log(time)
    if(typeof time != "undefined" && time != null && time.length > 0){
      for(let i=0; i<time.length; i++){
          this.handleUnavailClicked(time[i])
      }
    }else {
      console.log("hi")
      this.setState({morningClicked:false,afternoonClicked:false,eveningClicked:false,fullDayClicked:false,})
    }

  }

  showAllAvailabileTag(){
    return(
      <Tag color="#68EA22">Available All Day</Tag>
    )
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
                    ? this.showAllAvailabileTag() : null
                  }

                  { this.state.morningClicked ?
                    <Tag closable={true} color="#FFC300" afterClose={() => this.handleTagClose("Morning")}>Morning</Tag> : null
                  }
                  { this.state.afternoonClicked ?
                    <Tag closable={true} color="#FF5733" afterClose={() => this.handleTagClose("Afternoon")}>Afternoon</Tag> : null
                  }
                  { this.state.eveningClicked ?
                    <Tag closable={true} color="#3B9DF9" afterClose={() => this.handleTagClose("Evening")}>Evening</Tag> : null
                  }
                  { this.state.fullDayClicked ?
                    <Tag closable={true} color="#581845" afterClose={() => this.handleTagClose("Full-Day")}>Full Day</Tag> : null
                  }

                </div>
                <div className = "combo-button">
                  <Row gutter = {16}>
                    <Col span = {10}><Button className = "Morning-btn" onClick ={()=> this.handleUnavailClicked("Morning")}>
                      <h4>Morning</h4></Button></Col>
                    <Col span = {10}><Button className = "Afternoon-btn" onClick ={()=> this.handleUnavailClicked("Afternoon")}>
                      <h4>Afternoon</h4></Button></Col>
                    <Col span = {10}><Button className = "Evening-btn" onClick ={()=> this.handleUnavailClicked("Evening")}>
                      <h4>Evening</h4></Button></Col>
                    <Col span = {10}><Button className = "Fullday-btn" onClick ={()=> this.handleUnavailClicked("Full-Day")}>
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
        allUnAvailDateEachGuide: state.getAllUnAvailDateEachGuide.allUnAvailDateEachGuide,
        eachGuideUnAvailableEachDate: state.getEachGuideUnAvailableEachDate.eachGuideUnAvailableEachDate
      }
}


export default connect(mapStateToProps)(GuideTimetable)
