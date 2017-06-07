import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker,Form, Table, Select, Tag } from 'antd';
import {connect} from 'react-redux';
import apiAccess from '../../Helpers/apiAccess'
import EachAssignedTour from '../EachAssignedTour'

import moment from 'moment';

import { Modal } from 'react-bootstrap'
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
      guideIncomeSummary:[],
      showEachAssignedTourModal:false,
      eachAssignedTourTitle:"",
      selectedBookedTourID:"",
      eachTourInfo:[]
    }
  }

  getHistoryData(year,month){
     let guide_id = Cookies.get('guide_id')
     console.log(year)
     console.log(month)
    apiAccess({
      url: 'staffs/tour-guides/income-summary/'+guide_id+'/'+year+'/'+month,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_INCOME_SUMMARY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_INCOME_SUMMARY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_INCOME_SUMMARY_FAILED' })
    })
  }

  handleMonthChange(date, dateString) {
    let year = parseInt(dateString.substring(0,4))
    let month = parseInt(dateString.substring(5,dateString.length))

    this.setState({selectedMonth:month})
    this.setState({selectedYear:year})
  }

  eachAssignedTour(event,index){
    console.log(event)
    let title = event.start_date+"  "+event.tour_name
    this.setState({selectedBookedTourID:event._id})
    this.setState({eachTourInfo:event})
    this.setState({eachAssignedTourTitle:title})
    this.setState({showEachAssignedTourModal:true})
  }

  componentWillReceiveProps(nextProps){
    if(this.props.guideIncomeSummary !== nextProps.guideIncomeSummary){
      if(nextProps.guideIncomeSummary){
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

  checkStatus(record){
    let this_date = new Date(record.start_date).valueOf()
    let today = new Date()
    if(this_date < today){
      return(
        <Tag color="#87d068">Completed</Tag>
      )
    }else{
      return(
        <Tag color="#FACE0B">Upcoming</Tag>
      )
    }

  }

  render() {

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
    {
      title:'Status',
      dataIndex: 'status',
      render: (text, record) =>
      <div>
        {this.checkStatus(record)}
      </div>
    },
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

    let closeEachAssignedTourModal = () => { this.setState({showEachAssignedTourModal:false})}

    return (

      <div>

      <Modal
        show={this.state.showEachAssignedTourModal}
        onHide={closeEachAssignedTourModal}
        container={this}
        bsSize="lg"
        aria-labelledby="contained-modal-title"
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">
          {this.state.eachAssignedTourTitle}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EachAssignedTour dispatch={this.props.dispatch}
                          bookedTourID={this.state.selectedBookedTourID}
                          eachTourInfo={this.state.eachTourInfo}/>
      </Modal.Body>

      </Modal>

      <div className = "guide-content" >

        <div className = "guide-tourlist">
          <Row>
            <Col xs={12} lg={7}>
              <h4>List of Responsible Tours</h4>
            </Col>

            <Col xs={{span:10, offset:1}} lg={{span:7, offset:10}}>
              <MonthPicker defaultValue={moment(curYear+'-'+curMonth, 'YYYY-MM')} onChange={this.handleMonthChange.bind(this)} placeholder="Select month" />
              <Button type="primary" onClick={()=>this.changeDate()} >Go!</Button>
            </Col>
          </Row>

           <Table columns={columns} dataSource={this.state.guideIncomeSummary}
               onRowClick = {this.eachAssignedTour.bind(this)} size="middle" />
        </div>

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
