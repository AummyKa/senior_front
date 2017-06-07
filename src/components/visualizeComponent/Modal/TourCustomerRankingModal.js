import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon, Button,Popover, Select } from 'antd'
import { Modal ,ButtonToolbar } from 'react-bootstrap';

import apiAccess from '../../../Helpers/apiAccess'


const revTourCustomerTableData = (arrayJSON) =>{
  console.log(arrayJSON)
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
}
  return arrayJSON
}


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

class TourCustomerRankingModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      tourCustomerRankingData: [],
      tourCustomerRankingTableData: []
    }
  }


  getAllTourCustomerRanking(year){
    apiAccess({
      url: 'bookedtours/summary/participants/tour-name/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_FAILURE' })
    })
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

  componentWillMount(){
    this.getAllTourCustomerRanking(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.totalCustomerTourRanking !== nextProps.totalCustomerTourRanking){
      if(nextProps.totalCustomerTourRanking){
        this.setState({tourCustomerRankingData: this.limitedShowCustomerRankingData(nextProps.totalCustomerTourRanking)})
        this.setState({tourCustomerRankingTableData: revTourCustomerTableData(nextProps.totalCustomerTourRanking)})
      }
    }
    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getAllTourCustomerRanking(nextProps.selectedYear)
      }
    }
  }


  handleYearSelect(value,option){
    console.log(value)
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getAllTourCustomerRanking(this.state.selectedYear)
  }

  render() {

    const columns = [{ title: 'Tour name', dataIndex: 'tour_name'},
                    {  title: 'Public',dataIndex: 'public'},
                    {  title: 'Private',dataIndex: 'private'},
                    {  title: 'Total Participants', dataIndex: 'participants'}];

    return (

      <div>
        <div className = "table-month-rev-summary">

        <Row>

            <Col xs={13} lg={14} ><h5><b>Tour Revenue Summary</b></h5></Col>

              <Col xs={8} lg={7} >
                <div className = "select-year">
                  <Select
                     showSearch
                     style={{width: 150}}
                     defaultValue= {this.setState.selectedYear}
                     placeholder="Year"
                     optionFilterProp="children"
                     onSelect={this.handleYearSelect.bind(this)}
                     filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                   >
                    {throwOptionYearObject()}
                   </Select>
                </div>
                </Col>
                <Col span = {2}>
                    <Button type = "primary" onClick = {() => this.setYearRev()}>GO!</Button>
                </Col>
            </Row>
             <Table columns={columns} dataSource={this.state.tourCustomerRankingTableData} size="small" pagination={false} />

       </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    totalCustomerTourRanking: state.getTourCustomerRanking.totalCustomerTourRanking,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(TourCustomerRankingModal)
