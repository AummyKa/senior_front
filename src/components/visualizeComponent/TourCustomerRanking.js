import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell, ResponsiveContainer  } from 'recharts';
import { Col, Row, Table } from 'antd'
import Cookies from 'js-cookie'

import apiAccess from '../../Helpers/apiAccess'



let today = new Date();
let curYear = today.getFullYear();

class TourCustomerRanking extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      totalCustomerTourRankingData: []
    }
  }

  componentWillMount(){
    this.getAllTourCustomerRanking(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.state.totalCustomerTourRanking !== nextProps.totalCustomerTourRanking){
      if(nextProps.totalCustomerTourRanking){
        this.setState({totalCustomerTourRankingData: this.limitedShowCustomerRankingData(nextProps.totalCustomerTourRanking)})
      }
    }

    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getAllTourCustomerRanking(nextProps.selectedYear)
      }
    }

  }

  limitedShowCustomerRankingData(data){
    let result = []
    if(data){
      if(data.length >=10){
        for(let i=0;i<10;i++){
          result[i]=data[i]
        }
      }else{
        for(let i=0;i<data.length;i++){
          result[i]=data[i]
        }
      }
  }
  return result
}


  getAllTourCustomerRanking(year){
    console.log(year)
    apiAccess({
      url: 'bookedtours/summary/participants/tour-name/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_FAILURE' })
    })
  }

  render() {

    return (

      <ResponsiveContainer>

         <ComposedChart layout="vertical" width={300} height={250} data={this.state.totalCustomerTourRankingData}
             margin={{top: 10, right: 10, bottom: 20, left: 2}}>
           <XAxis type="number"/>
           <YAxis dataKey="tour_abbreviation" type="category"/>
           <Tooltip/>
           <Legend/>
           <CartesianGrid stroke='#f5f5f5'/>
           <Bar dataKey='participants' barSize={15} fill='#B85D02'/>
        </ComposedChart>

      </ResponsiveContainer>

    );
  }
}

function mapStateToProps(state){
  return {
    selectedYear: state.updateYearDashBoard.selectedYear,
    totalCustomerTourRanking: state.getTourCustomerRanking.totalCustomerTourRanking
  }
}

export default connect(mapStateToProps)(TourCustomerRanking)
