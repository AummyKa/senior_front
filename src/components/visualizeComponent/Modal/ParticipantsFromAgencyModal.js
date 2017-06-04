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

class ParticipantsFromAgencyModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedYear: curYear,
      totalParticipantAgencyData: []
    }
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

  componentWillMount(){
    this.getTotalParticipantsAgencyData(this.state.selectedYear)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.selectedYear!==nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
      }
    }
    if(this.props.agencyTotalParticipants !== nextProps.agencyTotalParticipants){
      if(nextProps.agencyTotalParticipants){
        this.setState({totalParticipantAgencyData:nextProps.agencyTotalParticipants})
      }
    }
  }

  handleYearSelect(value,option){
    console.log(value)
    this.setState({selectedYear: value})
  }

  setYearRev(){
    this.getTotalParticipantsAgencyData(this.state.selectedYear)
  }


  render() {

    const columns = [{ title: 'Agency', dataIndex: 'agency_name'},
                    {  title: 'Participants',dataIndex: 'participants'}];

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
        <Table columns={columns} dataSource={this.state.totalParticipantAgencyData} size="small"/>
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

export default connect(mapStateToProps)(ParticipantsFromAgencyModal)
