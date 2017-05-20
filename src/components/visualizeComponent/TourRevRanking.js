import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell, ResponsiveContainer  } from 'recharts';
import { Col, Row, Table } from 'antd'
import Cookies from 'js-cookie'

import apiAccess from '../../Helpers/apiAccess'



let today = new Date();
let curYear = today.getFullYear();

class TourRevRanking extends Component {

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
      if(nextProps.revTourRanking){
        console.log(this.limitedShowRankingData(nextProps.revTourRanking))
        this.setState({tourRankingData: this.limitedShowRankingData(nextProps.revTourRanking)})
      }
    }

    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getAllTourRevRanking(nextProps.selectedYear)
      }
    }

  }

  limitedShowRankingData(data){
    let result = []
    if(data){
      if(data.length >=10){
        for(let i=0;i<10;i++){
          let rev = parseInt(data[i].revenue.replace(',',''));
          var arrayJSON = {
            tour_abbreviation: data[i].tour_abbreviation,
            revenue: rev
          }
          result[i] = arrayJSON
        }
      }else{
        for(let i=0;i<data.length;i++){
          let rev = parseInt(data[i].revenue.replace(',',''));
          var arrayJSON = {
            tour_abbreviation: data[i].tour_abbreviation,
            revenue: rev
          }
          result[i] = arrayJSON
        }
      }
    }
    return result
  }

  getAllTourRevRanking(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/summary/revenue/tour-name/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_FAILED' })
    })
  }

  render() {

    console.log(this.state.tourRankingData)

    return (

      <ResponsiveContainer>

         <ComposedChart layout="vertical" width={300} height={250} data={this.state.tourRankingData}
             margin={{top: 10, right: 10, bottom: 20, left: 2}}>
           <XAxis type="number"/>
           <YAxis dataKey="tour_abbreviation" type="category"/>
           <Tooltip/>
           <Legend/>
           <CartesianGrid stroke='#f5f5f5'/>
           <Bar dataKey='revenue' barSize={15} fill='#FFC300'/>
        </ComposedChart>

      </ResponsiveContainer>

    );
  }
}

function mapStateToProps(state){
  return {
    revTourRanking: state.getTourRevRanking.revTourRanking,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(TourRevRanking)
