import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon, Button,Popover, Select } from 'antd'
import { Modal ,ButtonToolbar } from 'react-bootstrap';

import apiAccess from '../../../Helpers/apiAccess'
import Cookies from 'js-cookie'


const participantTableData = (arrayJSON) =>{
  console.log(arrayJSON)
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
}
  return arrayJSON
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

class TotalParticipantModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      totalParticipantData: [],
      totalParticipantTable:[]
    }
  }

  getParticipantTableData(year){
    apiAccess({
      url: 'bookedtours/summary/participants/tour-type/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_TABLE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_TABLE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_TABLE_FAILED' })
    })
  }

  getParticipantData(year){
    console.log(year)
    apiAccess({
      url: 'bookedtours/summary/participants/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_FAILED' })
    })
  }

  componentWillMount(){
    this.getParticipantData(this.state.selectedYear)
    this.getParticipantTableData(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.totalParticipantTable !== nextProps.totalParticipantTable){
      if(nextProps.totalParticipantTable){
        this.setState({totalParticipantTable:participantTableData(nextProps.totalParticipantTable)})
      }
    }

    if(this.props.totalParticipantData !== nextProps.totalParticipantData){
      if(nextProps.totalParticipantData){
        this.setState({totalParticipantData:nextProps.totalParticipantData})
      }
    }

    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getParticipantData(nextProps.selectedYear)
        this.getParticipantTableData(nextProps.selectedYear)
      }
    }
  }

  handleYearSelect(value,option){
    console.log(value)
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getParticipantData(this.state.selectedYear)
    this.getParticipantTableData(this.state.selectedYear)
  }

  render() {

    const columns = [{ title: 'Month', dataIndex: 'month'},
                    {  title: 'Public',dataIndex: 'public'},
                    {  title: 'Private',dataIndex: 'private'},
                    {  title: 'Total', dataIndex: 'total'}];

    return (

      <div>
        <div className = "table-month-rev-summary">

        <Row>
          <Col xs={0} lg={14}>

            <div className = "total-rev-area-chart">
              <AreaChart width={600} height={200} data={this.state.totalParticipantData}
                     margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                 <XAxis dataKey="month"/>
                 <YAxis dataKey='participants'/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Area type='monotone' dataKey='participants' stroke='#D67A01' fill='#ECF000' />
               </AreaChart>
            </div>

          </Col>
          <Col xs={24} lg={10}>
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
             <Table columns={columns} dataSource={this.state.totalParticipantTable} size="small" pagination={false} />
          </Col>
        </Row>


       </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    totalParticipantTable: state.getTotalParticipantTable.totalParticipantTable,
    totalParticipantData: state.getTotalParticipant.totalParticipantData,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(TotalParticipantModal)
