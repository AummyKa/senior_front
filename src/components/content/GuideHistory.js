import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker,Form, Table } from 'antd';
import {connect} from 'react-redux';
import apiAccess from '../../Helpers/apiAccess'

import moment from 'moment';
import { Select } from 'antd';
import Cookies from 'js-cookie'

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

const createTable = (arrayJSON) =>{
  if(arrayJSON){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
    return arrayJSON
  }
}

let today = new Date();
let curYear = today.getFullYear();
let curMonth = today.getMonth()+1

class GuideHistory extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedMonth:curMonth,
      selectedYear:curYear,
      guideIncomeSummary:[]
    }
  }

  getHistoryData(year,month){
     let guide_id = Cookies.get('guide_id')
     console.log(year)
     console.log(month)
    apiAccess({
      url: '  http://localhost:8000/staffs/tour-guides/income-summary/'+guide_id+'/'+year+'/'+month,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_INCOME_SUMMARY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_INCOME_SUMMARY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_INCOME_SUMMARY_FAILED' })
    })
  }

  startDateInput(date,dateString){
    this.setState({startMonthInput : dateString})
  }

  endDateInput(date,dateString){
    this.setState({endMonthInput : dateString})
  }

  handleMonthChange(date, dateString) {
    let year = parseInt(dateString.substring(0,4))
    let month = parseInt(dateString.substring(5,dateString.length))

    this.setState({selectedMonth:month})
    this.setState({selectedYear:year})
  }

  componentWillReceiveProps(nextProps){
    if(this.props.guideIncomeSummary !== nextProps.guideIncomeSummary){
      if(nextProps.guideIncomeSummary){
        console.log(nextProps.guideIncomeSummary.summarizedData)
        this.setState({guideIncomeSummary:createTable(nextProps.guideIncomeSummary.summarizedData)})
      }
    }
  }

  componentWillMount(){

    this.getHistoryData(this.state.selectedYear,this.state.selectedMonth)
  }

  changeDate(){
    this.getHistoryData(this.state.selectedYear,this.state.selectedMonth)
  }

  render() {

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
    {
      title: 'Start Date',
      dataIndex: 'start_date'
    },
    {
      title: 'Tour name',
      dataIndex: 'tour_name',
      key: 'tour_name',
      filteredValue: filteredInfo.tour_name|| null,
      onFilter: (value, record) => record.tour_name.includes(value),
      sorter: (a, b) => a.tour_name.length - b.tour_name.length,
      sortOrder: sortedInfo.columnKey === 'tour_name' && sortedInfo.order
    },{
      title: 'Tour Type',
      dataIndex: 'tour_type',
      filters: [
        { text: 'Public', value: 'Public' },
        { text: 'Private', value: 'Private' }
      ],
      filteredValue: filteredInfo.type|| null,
      onFilter: (value, record) => record.type.includes(value)
    },
    {
      title: 'Participants',
      dataIndex: 'participants'
    },{
      title: 'Payment',
      dataIndex: 'payment'
    }]

    return (

      <div className = "guide-content" >

        <div className = "guide-tourlist">
          <Row>
            <Col xs={12} lg={6}>
              <h4>List of responsible tours</h4>
            </Col>

            <Col xs={{span:10, offset:1}} lg={{span:7, offset:11}}>
              <MonthPicker defaultValue={moment(curYear+'-'+curMonth, 'YYYY-MM')} onChange={this.handleMonthChange.bind(this)} placeholder="Select month" />
              <Button type="primary" onClick={()=>this.changeDate()} >Go!</Button>
            </Col>
          </Row>

           <Table columns={columns} dataSource={this.state.guideIncomeSummary} size="middle" />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    guideIncomeSummary: state.getGuideIncomeSummary.guideIncomeSummary
  }
}


export default connect(mapStateToProps)(GuideHistory)
