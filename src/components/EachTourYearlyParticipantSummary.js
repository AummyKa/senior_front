import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon } from 'antd'
import StarRatingComponent from 'react-star-rating-component';

import {connect} from 'react-redux'
import apiAccess from '../Helpers/apiAccess'

const createTable = (arrayJSON) =>{
  if(arrayJSON){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
    return arrayJSON
  }
}

let today = new Date();
let curYear = today.getFullYear();

class EachTourYearlyParticipantSummary extends Component {

  constructor(props){
    super(props)
    this.state ={
      tour_id: this.props.tourId,
      selectedYear: curYear,
      eachTourYearlyParticipants:[]
    }
  }

  getEachTourYearlyParticipants(year){
    apiAccess({
      url: 'http://localhost:8000/tours/'+this.state.tour_id+'/participants/tour-type/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_PARTICIPANTS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_PARTICIPANTS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_PARTICIPANTS_FAILED' })
    })
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.eachTourYearlyParticipants !== this.props.eachTourYearlyParticipants){
      if(nextProps.eachTourYearlyParticipants){
        console.log(nextProps.eachTourYearlyParticipants)
        this.setState({eachTourYearlyParticipants:createTable(nextProps.eachTourYearlyParticipants)})
      }
    }
    if(this.props.selectedTourYear !== nextProps.selectedTourYear){
      if(nextProps.selectedTourYear){
        console.log(nextProps.selectedTourYear)
        this.setState({selectedYear:nextProps.selectedTourYear})
        this.getEachTourYearlyParticipants(nextProps.selectedTourYear)
      }
    }
  }

  componentWillMount(){
    this.getEachTourYearlyParticipants(this.state.selectedYear)
  }

  render() {

    const columns = [{ title: 'Month', dataIndex: 'month'},
                    { title: 'Private', dataIndex: 'private'},
                    { title: 'Public', dataIndex: 'public'},
                    { title: 'Total', dataIndex: 'total'}
                    ];

    return (

       <div className = "each-tour-expert-guide">
            <Table columns={columns} dataSource={this.state.eachTourYearlyParticipants} size="small" pagination = {false} />
        </div>


    );
  }
}

function mapStateToProps(state){
  return {
    eachTourYearlyParticipants: state.getEachTourYearlyParticipants.eachTourYearlyParticipants,
    selectedTourYear: state.updateYearDashBoard.selectedTourYear,
  }
}

export default connect(mapStateToProps)(EachTourYearlyParticipantSummary)
