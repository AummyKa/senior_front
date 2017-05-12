import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table } from 'antd'
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import Cookies from 'js-cookie'


const tourRevenueTableData = (arrayJSON) =>{
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
}
  return arrayJSON
}


let today = new Date();
let curYear = today.getFullYear();

class EachTourRevChart extends Component {

  constructor(props){
    super(props)
    this.state = {
      selected_year: curYear,
      eachTourYearlyRevenue:[],
      tour_id: Cookies.get('tour_id'),
      eachTourYearlyRevenueTable:[]
    }
  }


  getEachTourYearlyRevenue(){
    apiAccess({
      url: 'http://localhost:8000/tours/'+ this.state.tour_id +'/revenue/'+this.state.selected_year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_REVENUE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_REVENUE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_REVENUE_FAILED' })
    })
  }

  getEachTourYearlyRevenueTable(){
    apiAccess({
      url: 'http://localhost:8000/tours/'+ this.state.tour_id +'/revenue/tour-type/'+this.state.selected_year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_REVENUE_TABLE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_REVENUE_TABLE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_YEARLY_REVENUE_TABLE_FAILED' })
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.eachTourYearlyRevenue !== nextProps.eachTourYearlyRevenue){
      if(nextProps.eachTourYearlyRevenue){
        this.setState({eachTourYearlyRevenue:nextProps.eachTourYearlyRevenue})
      }
    }
    if(this.props.eachTourYearlyRevenueTable !== nextProps.eachTourYearlyRevenueTable){
      if(nextProps.eachTourYearlyRevenueTable){
        this.setState({eachTourYearlyRevenueTable:tourRevenueTableData(nextProps.eachTourYearlyRevenueTable)})
      }
    }
    if(this.props.selectedTourYear!==nextProps.selectedTourYear){
      if(nextProps.selectedTourYear){
        this.setState({selectedYear:nextProps.selectedTourYear})
      }
    }
  }

  componentWillMount(){
    this.getEachTourYearlyRevenue()
    this.getEachTourYearlyRevenueTable()
  }


  render() {

    const columns = [{ title: 'Month', dataIndex: 'month'},
                    {  title: 'Public',dataIndex: 'public'},
                    {  title: 'Private',dataIndex: 'private'},
                    {  title: 'Total', dataIndex: 'total'}];

    return (

      <div>
          <AreaChart width={650} height={230} data={this.state.eachTourYearlyRevenue}
                 margin={{top: 10, right: 30, left: 0, bottom: 0}}>
             <XAxis dataKey="month"/>
             <YAxis/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Area type='monotone' dataKey='revenue' stroke='#FF5733' fill='#FFC300' />
           </AreaChart>

             <div className = "each-tour-month-rev-summary">
              <Row>
                <Col span = {10}><h5><b>Monthly revenue summary</b></h5></Col>
                <Col span = {6} offset = {8}><h5>Year</h5></Col>
              </Row>
                <Table columns={columns} dataSource={this.state.eachTourYearlyRevenueTable}
                  pagination={false} size="small" />
            </div>

      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    eachTourYearlyRevenue: state.getEachTourYearlyRevenue.eachTourYearlyRevenue,
    eachTourYearlyRevenueTable: state.getEachTourYearlyRevenueTable.eachTourYearlyRevenueTable,
    selectedTourYear: state.updateYearDashBoard.selectedTourYear
  }
}

export default connect(mapStateToProps)(EachTourRevChart)
