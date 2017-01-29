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
          <ShowCalendar />
        </div>
      </div>



    );
  }
}

export default Schedule
