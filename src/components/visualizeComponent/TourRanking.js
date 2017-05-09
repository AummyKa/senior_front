import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table } from 'antd'
import Cookies from 'js-cookie'

import apiAccess from '../../Helpers/apiAccess'



let today = new Date();
let curYear = today.getFullYear();

class TourRanking extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      tourRankingData: []
    }
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

    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getAllTourRevRanking(nextProps.selectedYear)
      }
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

  render() {

    console.log(this.state.selectedYear)

    return (

      <div>

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

    );
  }
}

function mapStateToProps(state){
  return {
    revTourRanking: state.getTourRevRanking.revTourRanking,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(TourRanking)
