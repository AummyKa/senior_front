import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon, Button,Popover, Select } from 'antd'
import { Modal ,ButtonToolbar } from 'react-bootstrap';

import apiAccess from '../../../Helpers/apiAccess'


const revTourTableData = (arrayJSON) =>{
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

class TourRevRankingModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      tourRevRankingData: [],
      allTourRevTableRankingData:[]
    }
  }


  getAllTourRevRanking(year){
    apiAccess({
      url: 'bookedtours/summary/revenue/tour-name/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_REV_RANKING_FAILED' })
    })
  }

  componentWillMount(){
    this.getAllTourRevRanking(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.revTourRanking !== nextProps.revTourRanking){
      if(nextProps.revTourRanking){
        this.setState({tourRevRankingData: this.showAllRankingData(nextProps.revTourRanking)})
        console.log(nextProps.revTourRanking)
        this.setState({allTourRevTableRankingData:revTourTableData(nextProps.revTourRanking)})
      }
    }
    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
        this.getAllTourRevRanking(nextProps.selectedYear)
      }
    }

  }


  handleYearSelect(value,option){
    this.setState({selectedYear: value})
  }

  setYearRev(){
    console.log("yeah")
    this.getAllTourRevRanking(this.state.selectedYear)
    // this.setState({allTourRevTableRankingData: this.state
  }

  showAllRankingData(data){
    let result = []
    if(data){
      for(let i=0;i<data.length;i++){
        let rev = parseInt(data[i].revenue.replace(',',''));
        var arrayJSON = {
          tour_abbreviation: data[i].tour_name,
          revenue: rev
        }
        result[i] = arrayJSON
      }
    }
    return result
  }


  render() {

    const columns = [{ title: 'Tour', dataIndex: 'tour_name'},
                    {  title: 'Public',dataIndex: 'public'},
                    {  title: 'Private',dataIndex: 'private'},
                    {  title: 'Total', dataIndex: 'revenue'}];

    return (

      <div>
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
             <Table columns={columns} dataSource={this.state.allTourRevTableRankingData} size="small" pagination={false} />

      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    revTourRanking: state.getTourRevRanking.revTourRanking,
    selectedYear: state.updateYearDashBoard.selectedYear
  }
}

export default connect(mapStateToProps)(TourRevRankingModal)
