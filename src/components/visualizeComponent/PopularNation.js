import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table } from 'antd'

import Cookies from 'js-cookie'
import apiAccess from '../../Helpers/apiAccess'

//Pie Chart

const COLORS = ['#900C3F', '#C70039', '#FF5733', '#FFC300'];
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


const AddKeyPopNationTable = (arrayJSON) =>{
  let resultJSON = []
  if(arrayJSON!=null){
    if(arrayJSON.length > 4){
      for(var i = 0; i < 4; i++) {
        resultJSON[i] = arrayJSON[i]
        resultJSON[i]["key"] = i
      }
    }else{
      for(var i = 0; i < arrayJSON.length; i++) {
        resultJSON[i] = arrayJSON[i]
        resultJSON[i]["key"] = i
    }

  }
}
  return resultJSON
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
      url: 'http://localhost:8000/bookedtours/total-participants/country/'+year,
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
        this.setState({amountNationsSummary:nextProps.amountNationsSummary})
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
        <div>
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
                      data={AddKeyPopNationTable(this.state.amountNationsSummary)}
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
                    	this.state.amountNationsSummary.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                  </Pie>
                </PieChart>


                <div className= "popular-color-label">

                    {this.listNations(AddKeyPopNationTable(this.state.amountNationsSummary))}

                </div>

                <div className = "pop-nation-table">
                  <Table columns={columns} dataSource={AddKeyPopNationTable(this.state.amountNationsSummary)} size="small" pagination={false} />
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
