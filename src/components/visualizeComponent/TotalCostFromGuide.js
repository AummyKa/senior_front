import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell, ResponsiveContainer  } from 'recharts';
import { Col, Row, Table, Select, Button } from 'antd'

import apiAccess from '../../Helpers/apiAccess'


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

class TotalCostFromGuide extends Component {

  constructor(props){
    super(props)

    this.state = {
      selectedYear: curYear,
      yearlyTotalCostFromGuide: []
    }
  }

  componentWillReceiveProps(nextProps){

    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getCostData(nextProps.selectedYear)
      }
    }

    if(this.props.yearlyTotalCostFromGuide !== nextProps.yearlyTotalCostFromGuide){
      if(nextProps.yearlyTotalCostFromGuide){
        this.setState({yearlyTotalCostFromGuide:nextProps.yearlyTotalCostFromGuide})
      }
    }

    }

  componentWillMount(){
    this.getCostData(this.state.selectedYear)
  }

  getCostData(year){
    console.log(year)
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides/summary/payment/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_FAILED' })
    })
  }


  render() {


    return (

      <ResponsiveContainer>
          <AreaChart width={600} height={200} data={this.state.yearlyTotalCostFromGuide}
                 margin={{top: 10, right: 30, left: 0, bottom: 0}}>
             <XAxis dataKey="month"/>
             <YAxis dataKey='payment'/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Area type='monotone' dataKey='payment' stroke='#F81919' fill='#F74206' />
           </AreaChart>

      </ResponsiveContainer>

    );
  }
}

function mapStateToProps(state){
  return{
    selectedYear: state.updateYearDashBoard.selectedYear,
    yearlyTotalCostFromGuide: state.getYearlyTotalCostFromGuide.yearlyTotalCostFromGuide
  }
}

export default connect(mapStateToProps)(TotalCostFromGuide)
