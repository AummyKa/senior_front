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

class AgencyParticipantsRanking extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      totalParticipantAgencyData: [],
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.agencyTotalParticipants !== nextProps.agencyTotalParticipants){
      if(nextProps.agencyTotalParticipants){
        console.log(nextProps.agencyTotalParticipants)
        this.setState({totalParticipantAgencyData:nextProps.agencyTotalParticipants})
      }
    }

    if(this.props.selectedYear!==nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
      }
    }
  }

  componentWillMount(){
    this.getTotalParticipantsAgencyData(this.state.selectedYear)
  }

  handleYearSelect(value,option){
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getTotalParticipantsAgencyData(this.state.selectedYear)
  }

  getTotalParticipantsAgencyData(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/total-participants/agency/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_AGENCY_TOTAL_PARTICIPANTS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_AGENCY_TOTAL_PARTICIPANTS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_AGENCY_TOTAL_PARTICIPANTS_FAILED' })
    })
  }


  render() {

    return (

      <div>
        <BarChart width={600} height={300} data={this.state.totalParticipantAgencyData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="agency_name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="participants" fill="#FACE0B" />
      </BarChart>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    agencyTotalParticipants: state.getAgencyTotalParticipants.agencyTotalParticipants,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(AgencyParticipantsRanking)
