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

class TotalRev extends Component {

  constructor(props){
    super(props)

    this.state = {
      selectedYear: curYear,
      totalRevData: [],
      totalRevTable:[]
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.totalRevData !== nextProps.totalRevData){
      if(nextProps.totalRevData){
        this.setState({totalRevData:nextProps.totalRevData})
      }
    }
    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getRevData(nextProps.selectedYear)
      }
    }
    }

  componentWillMount(){
    this.getRevData(this.state.selectedYear)
  }

  handleYearSelect(value,option){
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getRevData(this.state.selectedYear)
  }

  getRevData(year){
    apiAccess({
      url: 'bookedtours/summary/revenue/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_TOTAL_REV_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_TOTAL_REV_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_TOTAL_REV_FAILED' })
    })
  }


  render() {


    return (

      <ResponsiveContainer>
          <AreaChart width={600} height={200} data={this.state.totalRevData}
                 margin={{top: 10, right: 30, left: 0, bottom: 0}}>
             <XAxis dataKey="month"/>
             <YAxis dataKey='revenue'/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Area type='monotone' dataKey='revenue' stroke='#4DA807' fill='#68F000' />
           </AreaChart>

      </ResponsiveContainer>

    );
  }
}

function mapStateToProps(state){
  return{
    totalRevData: state.getTotalRev.totalRevData,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(TotalRev)
