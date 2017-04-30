import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker,Form, Table } from 'antd';
import {connect} from 'react-redux';

import moment from 'moment';
import { Select } from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const monthFormat = 'YYYY-MM';

// import moment from 'moment';
// import 'moment/locale/en_US';
//
//
// import apiAccess from '../../Helpers/apiAccess'

// const { MonthPicker, RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
// moment.locale('en_US');



const data = [{
  key: '1',
  date: '2016-02-04',
  start: '20:30',
  end: '23:30',
  hours: '3',
  type: 'Public',
  tourname: 'Eat at night',
  tourist: '12/12'
}, {
  key: '2',
  date: '2016-02-04',
  start: '20:30',
  end: '23:30',
  hours: '3',
  type: 'Private',
  tourname: 'Eat at night',
  tourist: '12/12'
}, {
  key: '3',
  date: '2016-02-04',
  start: '20:30',
  end: '23:30',
  hours: '3',
  type: 'Public',
  tourname: 'Eat at night',
  tourist: '12/12'
}];
//
const expertData = [{
  key: '1',
  tour: "Offbeat Floating Markets Food Tour",
  numberOfTours: 3,
  rate:4
}, {
  key: '2',
  tour: "Historic Bangrak Food Tasting and Culture Tour",
  numberOfTours: 5,
  rate: 3
}, {
  key: '3',
  tour: "Eating Adventure at Chatuchak Market",
  numberOfTours: 11,
  rate: 5
}];

class GuideHistory extends Component {

  constructor(props){
    super(props)
    this.state = {
      current_m_salary: "28,500",
      amount_of_working_month: "72",
      average_salary: "30,000",
      cur_m_working_tour: "7"
    }
  }


  handleChange(value) {
    console.log(`selected ${value}`);
  }

  startDateInput(date,dateString){
    this.setState({startMonthInput : dateString})
  }

  endDateInput(date,dateString){
    this.setState({endMonthInput : dateString})
  }

  render() {

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime'
    },
    {
      title: 'Tour name',
      dataIndex: 'tourname',
      key: 'tourname',
      filteredValue: filteredInfo.tourname|| null,
      onFilter: (value, record) => record.tourname.includes(value),
      sorter: (a, b) => a.tourname.length - b.tourname.length,
      sortOrder: sortedInfo.columnKey === 'tourname' && sortedInfo.order
    },{
      title: 'Type',
      dataIndex: 'type',
      filters: [
        { text: 'Public', value: 'Public' },
        { text: 'Private', value: 'Private' }
      ],
      filteredValue: filteredInfo.type|| null,
      onFilter: (value, record) => record.type.includes(value)
    },
    {
      title: 'Participant',
      dataIndex: 'participant'
    }]

    return (

      <div className = "guide-content" >

        <div className = "guide-rev-top-detail">
        <Row>
           <Col span={12}>
           <ul>
            <li>Current month salary</li><br/>
            <li>Amount of working month</li><br/>
            <li>Average salary</li><br/><br/>
          </ul>
           </Col>

           <Col span={12}>
             <ul>
              <li>{this.state.current_m_salary}     baht</li><br/>
              <li>{this.state.amount_of_working_month}     tours</li><br/>
              <li>{this.state.average_salary}     baht</li><br/><br/>
            </ul>
           </Col>
      </Row>
      </div>

        <div className = "guide-tourlist">
            <h4>List of responsible tour Start {<MonthPicker style={{ width: 80 }} size={"default"}
            defaultValue ={moment(this.state.startMonthInput, monthFormat)} onChange={this.startDateInput.bind(this)} />}
            End {<MonthPicker style={{ width: 80 }} size={"default"}
            defaultValue ={moment(this.state.endMonthInput, monthFormat)} onChange={this.endDateInput.bind(this)}/>}
            </h4>
           <Table columns={columns} dataSource={data} size="middle" />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {

    return {

      }
}


export default connect(mapStateToProps)(GuideHistory)
