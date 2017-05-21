import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon, Popover, Select , Button } from 'antd'
import { Modal, ButtonToolbar } from 'react-bootstrap';

import Cookies from 'js-cookie'

import TotalRev from '../visualizeComponent/TotalRev'
import BoxAbove from '../visualizeComponent/BoxAbove'
import TourRevRanking from '../visualizeComponent/TourRevRanking'
import PopularNation from '../visualizeComponent/PopularNation'
import TotalRevModal from '../visualizeComponent/Modal/TotalRevModal'
import TourRevRankingModal from '../visualizeComponent/Modal/TourRevRankingModal'
import PopNationModal from '../visualizeComponent/Modal/PopNationModal'
import TotalParticipant from '../visualizeComponent/TotalParticipant'
import TotalParticipantModal from '../visualizeComponent/Modal/TotalParticipantModal'
import TourCustomerRanking from '../visualizeComponent/TourCustomerRanking'
import TourCustomerRankingModal from '../visualizeComponent/Modal/TourCustomerRankingModal'
import TotalCostFromGuide from '../visualizeComponent/TotalCostFromGuide'

import { changeYearDashBoard } from '../../actions/action-changeYearDashBoard'



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

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      showMoreTourRevRanking: false,
      showMoreNationsSummary: false,
      showMoreTotalRevenue:false,
      showMoreParticipantSummary:false,
      selectedYear:curYear,
      showMoreTourCustomerRankingSummary:false
    }
  }


  handleClickShowMoreTourRevRanking(){
    this.setState({showMoreTourRevRanking: true})
  }

  handleClickShowMoreNationsSummary(){
    this.setState({showMoreNationsSummary: true})
  }

  handleClickshowMoreTotalRevenue(){
    this.setState({showMoreTotalRevenue: true})
  }

  handleClickShowMoreTourCustomerRanking(){
    this.setState({showMoreTourCustomerRankingSummary: true})
  }

  handleYearSelect(value,option){
  this.setState({selectedYear: value})
  }

  handleClickShowTotalParticipant(value,option){
    this.setState({showMoreParticipantSummary: true})
  }

  setYearRev(){
    // Cookies.set('selectedYearInDashBoard',this.state.selectedYear)
    // this.getRevData(this.state.selectedYear)
    this.props.dispatch(changeYearDashBoard('CHANGE_YEAR',this.state.selectedYear))
  }


  render() {

    let closeShowMoreTourRevRanking = () => { this.setState({showMoreTourRevRanking: false}) }
    let closeShowMoreNationsSummary = () => { this.setState({showMoreNationsSummary: false}) }
    let closeShowMoreTotalRevenue = () => { this.setState({showMoreTotalRevenue:false}) }
    let closeShowMoreParticipantSummary = () => { this.setState({showMoreParticipantSummary:false}) }
    let closeShowMoreTourCustomerRankingSummary = () => { this.setState({showMoreTourCustomerRankingSummary: false}) }

    return (

      <div className="home-dashboard">

        <div className="modal-container">
            <Modal
              bsSize="large"
              show={this.state.showMoreTotalRevenue}
              onHide={closeShowMoreTotalRevenue}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Total Revenue Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TotalRevModal dispatch = {this.props.dispatch} />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container">
            <Modal
              bsSize="lg"
              show={this.state.showMoreTourRevRanking}
              onHide={closeShowMoreTourRevRanking}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Tour Total Revenue Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TourRevRankingModal dispatch = {this.props.dispatch} />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container">
            <Modal
              bsSize="lg"
              show={this.state.showMoreNationsSummary}
              onHide={closeShowMoreNationsSummary}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Tour Total Revenue Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PopNationModal dispatch = {this.props.dispatch} />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container">
            <Modal
              bsSize="lg"
              show={this.state.showMoreParticipantSummary}
              onHide={closeShowMoreParticipantSummary}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Total Participant Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TotalParticipantModal dispatch = {this.props.dispatch} />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container">
            <Modal
              bsSize="lg"
              show={this.state.showMoreTourCustomerRankingSummary}
              onHide={closeShowMoreTourCustomerRankingSummary}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Tour Customer Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TourCustomerRankingModal dispatch ={this.props.dispatch}/>
              </Modal.Body>

            </Modal>
        </div>

        <div className = "year-selection">
          <Row>
            <Col span={6}>
              <div className ="year-title">
                <h2>{this.state.selectedYear}</h2>
              </div>
            </Col>

            <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 12 }} className="year-go">
              <Icon type="calendar" />
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
               <Button type = "primary" onClick = {() => this.setYearRev()}>GO!</Button>
            </Col>
         </Row>
        </div>

        <div className="gutter-example" >
            <BoxAbove dispatch = {this.props.dispatch}/>
        </div>

        <Row gutter={16}>
         <Col xs={24} lg={16}>
           <div className = "visualize-box">
             <div className = "visualize-label">
               <Row>
                 <Col span = {14} className="label-box">
                  <h4>Total Revenue Summary</h4>
                 </Col>
                <Col span = {1} offset = {9}>
                  <Popover placement="top" title={"See more!"}>
                    <Icon className = "read-more-button" type="ellipsis"
                      onClick = {()=> this.handleClickshowMoreTotalRevenue()}/>
                 </Popover>
                </Col>
              </Row>
             </div>
             <TotalRev dispatch = {this.props.dispatch}/>
           </div>

           <div className = "visualize-box">
             <div className = "visualize-label">
               <Row>
                 <Col span = {14} className="label-box">
                  <h4>Total Customer Summary</h4>
                 </Col>
                <Col span = {1} offset = {9}>
                  <Popover placement="top" title={"See more!"}>
                    <Icon className = "read-more-button" type="ellipsis"
                      onClick = {()=> this.handleClickShowTotalParticipant()}/>
                 </Popover>
                </Col>
              </Row>
             </div>
             <TotalParticipant dispatch = {this.props.dispatch} />
           </div>

           <div className = "visualize-box">
             <div className = "visualize-label">
               <Row>
                 <Col span = {14} className="label-box">
                  <h4>Total Cost From Guide</h4>
                 </Col>
                <Col span = {1} offset = {9}>
                  {/*<Popover placement="top" title={"See more!"}>
                    <Icon className = "read-more-button" type="ellipsis"
                      onClick = {()=> this.handleClickShowTotalParticipant()}/>
                 </Popover> */}
                </Col>
              </Row>
             </div>
             <TotalCostFromGuide dispatch={this.props.dispatch}/>
           </div>

         </Col>

         <Col xs={24} lg={8}>
           <div className = "visualize-box">
             <div className = "visualize-label">
                <Row>
                  <Col span = {17} className="label-box">
                   <h4>Tour Revenue Ranking</h4>
                  </Col>
                 <Col span = {1} offset = {5}>
                   <Popover placement="top" title={"See more!"}>
                     <Icon className = "read-more-button" type="ellipsis"
                       onClick = {()=> this.handleClickShowMoreTourRevRanking()}/>
                  </Popover>
                 </Col>
               </Row>
             </div>
             <TourRevRanking dispatch = {this.props.dispatch}/>
           </div>

           <div className = "visualize-box">
             <div className = "visualize-label">
                <Row>
                  <Col span = {17} className="label-box">
                   <h4>Tour Customer Ranking</h4>
                  </Col>
                 <Col span = {1} offset = {5}>
                   <Popover placement="top" title={"See more!"}>
                     <Icon className = "read-more-button" type="ellipsis"
                       onClick = {()=> this.handleClickShowMoreTourCustomerRanking()}/>
                  </Popover>
                 </Col>
               </Row>
             </div>
             <TourCustomerRanking dispatch = {this.props.dispatch}/>
           </div>

           <div className = "visualize-box">
             <div className = "visualize-label">
               <Row>
                 <Col span = {17} className="label-box">
                  <h4>Popular Nation</h4>
                 </Col>
                <Col span = {1} offset = {5}>
                  <Popover placement="top" title={"See more!"}>
                    <Icon className = "read-more-button" type="ellipsis"
                      onClick = {()=> this.handleClickShowMoreNationsSummary()}/>
                 </Popover>
                </Col>
              </Row>
             </div>
             <PopularNation dispatch = {this.props.dispatch}/>
           </div>

         </Col>

      { /*</Row>
        <Col span={8}>
          <div className = "fav-nation">
          </div>
        </Col>
        <Col span={8}>
          <div className = "guide-rev">
          </div>
        </Col>
        <Col span={8}>
          <div className = "guide-rev-graph">
          </div>
        </Col>
      <Row>
      */}
      </Row>

      </div>

    );
  }
}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps)(Home)
