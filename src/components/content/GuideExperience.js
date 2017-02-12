import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker, Table} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';


//import apiAccess from '../../Helpers/apiAccess'

const { MonthPicker, RangePicker } = DatePicker;
const monthFormat = 'YYYY-MM';



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


class GuideExperience extends Component {

  constructor(props){
    super(props)
    this.state = {
      startdate: "2010-03-01",
      startMonthInput: "2000-02",
      endMonthInput:"2000-03",
      amount_of_workTours: "200",
    }
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
      title: 'Start',
      dataIndex: 'start'
    }, {
      title: 'End',
      dataIndex: 'end',
    }, {
      title: 'Total Hours',
      dataIndex: 'hours',
    },
     {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        { text: 'Public', value: 'Public' },
        { text: 'Private', value: 'Private' }
      ],
      filteredValue: filteredInfo.type|| null,
      onFilter: (value, record) => record.type.includes(value)
    }, {
        title: 'Tour name',
        dataIndex: 'tourname',
        filteredValue: filteredInfo.tourname|| null,
        onFilter: (value, record) => record.tourname.includes(value),
        sorter: (a, b) => a.tourname.length - b.tourname.length,
        sortOrder: sortedInfo.columnKey === 'tourname' && sortedInfo.order,
      },
    {
      title: 'Tourists',
      dataIndex: 'tourist'
    }
    ];

    return (
      <div className = "guide-content" >
        <Row>
           <Col span={12}>
           <ul>
            <li>StartDate</li><br/>
            <li>Amount of working tours</li><br/>
            <li>List of responsible tour</li><br/>

          </ul>
           </Col>

           <Col span={12}>
             <ul>
              <li>{this.state.startdate}</li><br/>
              <li>{this.state.amount_of_workTours}  tours</li><br/>
            </ul>
           </Col>
        </Row>

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


export default connect(mapStateToProps)(GuideExperience)
