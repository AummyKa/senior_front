import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon, Button,Popover, Select } from 'antd'
import { Modal ,ButtonToolbar } from 'react-bootstrap';

import apiAccess from '../../../Helpers/apiAccess'
import Cookies from 'js-cookie'


const revTableData = (arrayJSON) =>{
  console.log(arrayJSON)
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
}
  return arrayJSON
}

function getTotalMonthlyRev(pub,pri){

  let intPub = parseInt(pub.replace(',',''))
  let intPri = parseInt(pri.replace(',',''))
  let total = intPub + intPri
  return(
    <span>{total}</span>
  )
}

function throwOptionYearObject(){
  let today = new Date();
  let curYear = today.getFullYear();
  let startYear = 2000

  let temp = []
  for (let i = startYear; i <= curYear; i++) {
    temp.push(<Option key= {i}>{i}</Option>);
  }
  return temp
}


const Option = Select.Option;
let today = new Date();
let curYear = today.getFullYear();

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: Cookies.get('selectedYearInDashBoard'),
      totalRevData: [],
      totalRevTable:[]
    }
  }

  getRevTableData(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/summary/revenue/public-private/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_TOTAL_REV_TABLE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_TOTAL_REV_TABLE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_TOTAL_REV_TABLE_FAILED' })
    })
  }

  getRevData(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/summary/revenue/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_TOTAL_REV_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_TOTAL_REV_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_TOTAL_REV_FAILED' })
    })
  }

  componentWillMount(){
    this.getRevData(this.state.selectedYear)
    this.getRevTableData(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.totalRevTable !== nextProps.totalRevTable){

      if(nextProps.totalRevTable){
        this.setState({totalRevTable:revTableData(nextProps.totalRevTable)})
      }
    }
    if(this.props.totalRevData !== nextProps.totalRevData){
      if(nextProps.totalRevData){
        this.setState({totalRevData:nextProps.totalRevData})
      }
    }
  }

  handleYearSelect(value,option){
    console.log(value)
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getRevTableData(this.state.selectedYear)
  }


  render() {

    const columns = [{ title: 'Month', dataIndex: 'month'},
                    {  title: 'Public',dataIndex: 'public'},
                    {  title: 'Private',dataIndex: 'private'},
                    {  title: 'Total', dataIndex: 'total', render: (text, record) =>
                      getTotalMonthlyRev(record.public,record.private) }];

    return (

      <div>
        <div className = "table-month-rev-summary">

        <Row>
          <Col span={14}>

            <div className = "total-rev-area-chart">
              <AreaChart width={650} height={300} data={this.state.totalRevData}>
                 <XAxis dataKey="month"/>
                 <YAxis dataKey='revenue'/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Area type='monotone' dataKey='revenue' stroke='#F81919' fill='#C70039' />
               </AreaChart>
            </div>

          </Col>
          <Col span={10}>
            <Row>
              <Col span = {14}><h5><b>Monthly participants summary</b></h5></Col>

              <Col span = {8}>
                <div className = "select-year">
                  <Select
                     showSearch
                     style={{width: 150}}
                     defaultValue= {this.setState.selectedYear}
                     placeholder="Year"
                     optionFilterProp="children"
                     onSelect={this.handleYearSelect.bind(this)}
                     filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                   >
                    {throwOptionYearObject()}
                   </Select>
                </div>
                </Col>
                <Col span = {2}>
                    <Button type = "primary" onClick = {() => this.setYearRev()}>GO!</Button>
                </Col>
            </Row>
             <Table columns={columns} dataSource={this.state.totalRevTable} size="small" pagination={false} />
          </Col>
        </Row>


       </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    totalRevTable: state.getTotalRevTable.totalRevTable,
    totalRevData: state.getTotalRev.totalRevData
  }
}

export default connect(mapStateToProps)(Home)
