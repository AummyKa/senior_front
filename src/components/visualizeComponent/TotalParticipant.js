import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Select, Button } from 'antd'

import apiAccess from '../../Helpers/apiAccess'



const Option = Select.Option;
let today = new Date();
let curYear = today.getFullYear();

class TotalParticipant extends Component {

  constructor(props){
    super(props)

    this.state = {
      selectedYear: curYear,
      totalParticipantData: []
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.totalParticipantData)
    if(this.props.totalParticipantData !== nextProps.totalParticipantData){
      if(nextProps.totalParticipantData){
        this.setState({totalParticipantData:nextProps.totalParticipantData})
      }
    }
    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getParticipantData(nextProps.selectedYear)
      }
    }
    }

  componentWillMount(){
    this.getParticipantData(this.state.selectedYear)
  }

  handleYearSelect(value,option){
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getParticipantData(this.state.selectedYear)
  }

  getParticipantData(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/summary/participants/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_TOTAL_PARTICIPANT_FAILED' })
    })
  }


  render() {


    return (

      <div>
          <AreaChart width={600} height={200} data={this.state.totalParticipantData}
                 margin={{top: 10, right: 30, left: 0, bottom: 0}}>
             <XAxis dataKey="month"/>
             <YAxis dataKey='participants'/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Area type='monotone' dataKey='participants' stroke='#D67A01' fill='#ECF000' />
           </AreaChart>

      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    totalParticipantData: state.getTotalParticipant.totalParticipantData,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(TotalParticipant)
