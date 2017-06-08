import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell, ResponsiveContainer  } from 'recharts';
import { Col, Row, Table } from 'antd'

import Cookies from 'js-cookie'
import apiAccess from '../../Helpers/apiAccess'

//Pie Chart

const COLORS = ['#900C3F', '#C70039', '#FF5733', '#FFC300','#DAF7A6','#4ACB09'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

const columns = [{
  title: 'Country',
  dataIndex: 'country',
}, {
  title: 'Participants',
  dataIndex: 'participants',
}]


const limitNationChart = (arrayJSON) =>{
  let resultJSON = []
  if(arrayJSON!=null){
    if(arrayJSON.length > 5){
      for(var i = 0; i < 5; i++) {
        arrayJSON[i]["key"] = i;
        resultJSON[i] = arrayJSON[i]
      }
      let leftParticipants = 0
      for(var i=5;i<arrayJSON.length;i++){
        leftParticipants = leftParticipants + arrayJSON[i].participants
      }
      resultJSON.push({country:'others',participants:leftParticipants})

    }else{
      for(var i = 0; i < arrayJSON.length; i++) {
        resultJSON[i] = arrayJSON[i]
      }

  }
}
  return resultJSON
}

const createTable = (arrayJSON) =>{
  console.log(arrayJSON)
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {

  }
}
  return arrayJSON
}




let today = new Date();
let curYear = today.getFullYear();

class PopularNation extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      amountNationsSummary: []
    }
  }

  getPopularNation(year){
    apiAccess({
      url: 'bookedtours/total-participants/country/'+year,
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
    console.log(nextProps.amountNationsSummary)
    if(this.props.amountNationsSummary !== nextProps.amountNationsSummary){
      if(nextProps.amountNationsSummary){
        this.setState({amountNationsSummary:limitNationChart(nextProps.amountNationsSummary)})
        this.setState({amountNationsSummaryTable:createTable(nextProps.amountNationsSummary)})
      }
    }
    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getPopularNation(nextProps.selectedYear)
      }
    }
  }

listNations(data) {
    if(data.length !== 0){

      const list = data.map((key,index) =>
        <div key={index}>
          <Col span = {3} ><div className = "little-box-label" style = {{backgroundColor: COLORS[index]}}/></Col>
          <Col span = {9} ><div>{key.country}</div></Col>
        </div>
      );

      return (
        <Row>
          {list}
        </Row>
      );
    }
  }

  render() {

    return (

      <div>
          <div className= "piechart-container">
                <PieChart width={300} height={170} onMouseEnter={this.onPieEnter}>
                    <Pie
                      data={this.state.amountNationsSummary}
                      cx={140}
                      cy={80}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      nameKey={'country'}
                      valueKey={'participants'}
                    >
                    {
                    	this.state.amountNationsSummary.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]}/>)
                    }
                  </Pie>
                </PieChart>

                <div className= "popular-color-label">
                    {this.listNations(this.state.amountNationsSummary)}
                </div>

                <div className = "pop-nation-table">
                  <Table columns={columns} dataSource={this.state.amountNationsSummary} size="small" pagination={false} />
                </div>

            </div>


      </div>


    );
  }
}

function mapStateToProps(state){
  return{
    amountNationsSummary: state.getAmountNationsSummary.amountNationsSummary,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(PopularNation)
