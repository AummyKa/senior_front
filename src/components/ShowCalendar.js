import React, { Component } from 'react';
import { Calendar } from 'antd';
import apiAccess from '../Helpers/apiAccess'
import {connect} from 'react-redux';


const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'normal', content: 'This is usual event.' },
      ]; break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'normal', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ]; break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'normal', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ]; break;
    default:
  }
  return listData || [];
}

const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {
        listData.map(item =>
          <li key={item.content}>
            <span className={`event-${item.type}`}>●</span>
            {item.content}
          </li>
        )
      }
    </ul>
  );
}

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
}

const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? <div className="notes-month">
    <section>{num}</section>
    <span>Backlog number</span>
  </div> : null;
}

const getEventDate = (arrayJSON) =>{
  let resultJSON = []
  for(var i = 0; i < arrayJSON.length; i++) {

    var objectJSON = {
      start: getActualDate(arrayJSON[i].start),
    }
    resultJSON[i] = objectJSON
}
  return resultJSON

}

const getActualDate = (strDate) =>{
  let actualDate = strDate.substring(0,strDate.indexOf("T"))
  return actualDate

}





class ShowCalendar extends Component {

constructor(props){
  super(props)

  apiAccess({
    url: 'http://localhost:8000/calendar',
    method: 'GET',
    attemptAction: () => this.props.dispatch({ type: 'GET_CALENDAR_ATTEMPT' }),
    successAction: (json) => this.props.dispatch({ type: 'GET_CALENDAR_SUCCESS', json }),
    failureAction: () => this.props.dispatch({ type: 'GET_CALENDAR_FAILED' })
  })

}

componentWillReceiveProps(nextProps){
  if(this.props.events !== nextProps.events){
    let tour_event = nextProps.events
    console.log(tour_event)
    console.log(getEventDate(tour_event))
  }
}

render(){
  return(
    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
  )

}
}

const mapStateToProps = (state) => {
    return {
        events : state.calendar.events
    };
}

export default connect(mapStateToProps)(ShowCalendar)
