import React, { Component } from 'react';

import ShowCalendar from '../ShowCalendar'



class Schedule extends Component {


  render() {
    return (

      <div>
        <div>
          <h2>Schedule</h2>
        </div>
        <div className = "calendar">
          <ShowCalendar dispatch = {this.props.dispatch} />
        </div>
      </div>



    );
  }
}

export default Schedule
