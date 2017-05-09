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

class PopNationModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: Cookies.get('selectedYearInDashBoard'),
      amountNationsSummary:[]
    }
  }

  getPopularNation(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/summary/participants/country/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SUMMARY_AMOUNT_NATIONS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SUMMARY_AMOUNT_NATIONS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SUMMARY_AMOUNT_NATIONS_FAILED' })
    })
  }

  componentWillMount(){
    this.getPopularNation(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.amountNationsSummary !== nextProps.amountNationsSummary){
      if(nextProps.amountNationsSummary){
        console.log(nextProps.amountNationsSummary)
        this.setState({amountNationsSummary:nextProps.amountNationsSummary})
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


    return (

      <div>
        <div className = "table-month-rev-summary">

        <Row>
          <Col span={14}>

            <div className = "pop-nation-chart-summary">
              <ComposedChart layout="vertical" width={300} height={250} data={this.state.amountNationsSummary}
                  margin={{top: 10, right: 10, bottom: 20, left: 2}}>
                <XAxis type="number"/>
                <YAxis dataKey="country" type="category"/>
                <Tooltip/>
                <Legend/>
                <CartesianGrid stroke='#f5f5f5'/>
                <Bar dataKey='participants' barSize={15} fill='#FFC300'/>

             </ComposedChart>
            </div>

          </Col>
          <Col span={10}>
            <Row>
              <Col span = {14}><h5><b>Monthly revenue summary</b></h5></Col>

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
    amountNationsSummary: state.getAmountNationsSummary.amountNationsSummary
  }
}

export default connect(mapStateToProps)(PopNationModal)
