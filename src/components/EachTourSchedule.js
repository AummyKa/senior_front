import React, { Component } from 'react';
// import { Row,Col,Radio,Button,Input, DatePicker,Form } from 'antd';
import {connect} from 'react-redux';

import { Row,Col,Button, Input, Tag } from 'antd';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';

import Cookies from 'js-cookie'


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


class EachTourSchedule extends Component {

  constructor(props){
    super(props)

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



  render() {

    return (
      <div>
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

    );
  }
}
//
// function mapStateToProps(state) {
//
//     return {
//         addUnAvailDateEachGuideStatus: state.addUnAvailDateEachGuide.addUnAvailDateEachGuideStatus
//       }
// }


export default EachTourSchedule
