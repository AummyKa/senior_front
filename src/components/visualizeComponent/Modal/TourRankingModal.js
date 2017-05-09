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

class TourRankingModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: Cookies.get('selectedYearInDashBoard'),
      tourRankingData: []
    }
  }


  getAllTourRevRanking(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/summary/revenue/bookedtour/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_FAILED' })
    })
  }
  componentWillMount(){
    this.getAllTourRevRanking(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.revTourRanking !== nextProps.revTourRanking){
      console.log(nextProps.revTourRanking)
      if(nextProps.revTourRanking){
        this.setState({tourRankingData: nextProps.revTourRanking})
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

            <div className = "tour-ranking-chart-summary">
              <ComposedChart layout="vertical" width={300} height={250} data={this.state.tourRankingData}
                  margin={{top: 10, right: 10, bottom: 20, left: 2}}>
                <XAxis type="number"/>
                <YAxis dataKey="tour_name" type="category"/>
                <Tooltip/>
                <Legend/>
                <CartesianGrid stroke='#f5f5f5'/>
                <Bar dataKey='revenue' barSize={15} fill='#FFC300'/>

             </ComposedChart>
            </div>

          </Col>
          <Col span={10}>
            <Row>
              <Col span = {14}><h5><b>Tour Revenue Summary</b></h5></Col>

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
             {/*<Table columns={columns} dataSource={this.state.totalRevTable} size="small" pagination={false} />*/}
          </Col>
        </Row>


       </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
      revTourRanking: state.getTourRevRanking.revTourRanking
  }
}

export default connect(mapStateToProps)(TourRankingModal)
