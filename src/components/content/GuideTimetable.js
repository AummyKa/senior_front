import React, { Component } from 'react';
// import { Row,Col,Radio,Button,Input, DatePicker,Form } from 'antd';
import {connect} from 'react-redux';

import { Row,Col,Button } from 'antd';

import DayPicker, { DateUtils } from 'react-day-picker';
import changeDateFormat from '../../Helpers/changeDateFormat'

import 'react-day-picker/lib/style.css';
import '../../../public/css/eachguide-calendar.css'


const today = new Date()


const range = DateUtils.addDayToRange(today,);


class GuideTimetable extends Component {

  constructor(props){
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      startdate: "",
      amount_of_workTours: "",
      selectedDays: []
    }
  }

  handleDayClick(day, { selected }) {
   const { selectedDays } = this.state;
   if (selected) {
     const selectedIndex = selectedDays.findIndex(selectedDay =>
       DateUtils.isSameDay(selectedDay, day),
     );
     selectedDays.splice(selectedIndex, 1);
   } else {
     selectedDays.push(day);
   }
   this.setState({ selectedDays });
 }

 simplifiedDate(dates){
   const newDates = dates.map((date) => changeDateFormat(date.toString().substring(0,15)))
   return newDates
 }

  render() {

    console.log(this.simplifiedDate(this.state.selectedDays))

    const modifiers={
        future: { after: new Date() }
    }

    return (
      <div>
        <div className = "guide-content" >
          <Row justify="space-between">
             <Col span={18} style = {{backgroundColor: "#ECE9E9"}}>
              <DayPicker
                modifiers={ modifiers }
                numberOfMonths={ 2 }
                selectedDays={ this.state.selectedDays }
                onDayClick={ this.handleDayClick }
                enableOutsideDays ={true}
                disabledDays={{ before: today, not: today }}
              />
            </Col>
            <Col span={6}>
              <Button type="danger">Confirm unavailable date</Button>
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
