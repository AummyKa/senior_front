import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Col, Row, Table, Icon, Button,Popover, Select} from 'antd'
import { Modal ,ButtonToolbar } from 'react-bootstrap';

import apiAccess from '../../../Helpers/apiAccess'



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

class CostFromGuideModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      yearlyTotalCostFromGuide: []
    }
  }

  getCostData(year){
    console.log(year)
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides/summary/payment/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_FAILED' })
    })
  }

  componentWillMount(){
    this.getCostData(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.selectedYear!==nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
      }
    }
    if(this.props.yearlyTotalCostFromGuide !== nextProps.yearlyTotalCostFromGuide){
      if(nextProps.yearlyTotalCostFromGuide){
        console.log(nextProps.yearlyTotalCostFromGuide)
        this.setState({yearlyTotalCostFromGuide:nextProps.yearlyTotalCostFromGuide})
      }
    }
  }

  handleYearSelect(value,option){
    console.log(value)
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getCostData(this.state.selectedYear)
  }


  render() {

    const columns = [{ title: 'Month', dataIndex: 'full_month'},
                    {  title: 'Payment',dataIndex: 'payment'}];

    return (

      <div className="participants-agency-wrapper">
        <div className="agency-year-selection" style={{marginBottom:'2%'}}>
          <Row>
            <Col span={7} offset={14}>
            <Select
               showSearch
               style={{width: 150}}
               defaultValue= {this.state.selectedYear}
               placeholder="Year"
               optionFilterProp="children"
               onSelect={this.handleYearSelect.bind(this)}
               filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
             >
              {throwOptionYearObject()}
             </Select>
            </Col>
            <Col span={2}>
              <Button type = "primary" onClick = {() => this.setYearRev()}>GO!</Button>
            </Col>
          </Row>
        </div>
        <Table columns={columns} dataSource={this.state.yearlyTotalCostFromGuide} size="small" pagination={false}/>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    selectedYear: state.updateYearDashBoard.selectedYear,
    yearlyTotalCostFromGuide: state.getYearlyTotalCostFromGuide.yearlyTotalCostFromGuide
  }
}

export default connect(mapStateToProps)(CostFromGuideModal)
