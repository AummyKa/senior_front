import React, { Component } from 'react';
// import { Row,Col,Radio,Button,Input, DatePicker,Form } from 'antd';
import {connect} from 'react-redux';
// import moment from 'moment';
// import 'moment/locale/en_US';
//
//
// import apiAccess from '../../Helpers/apiAccess'

// const { MonthPicker, RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
// moment.locale('en_US');

class GuideTimetable extends Component {

  constructor(props){
    super(props)
    this.state = {
      startdate: "",
      amount_of_workTours: "",
    }
  }


  render() {

    return (

      <div className = "guide-content" >
        
      </div>
    );
  }
}

function mapStateToProps(state) {

    return {

      }
}


export default connect(mapStateToProps)(GuideTimetable)
