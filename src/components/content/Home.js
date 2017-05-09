import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon, Popover, Select , Button } from 'antd'
import { Modal, ButtonToolbar } from 'react-bootstrap';

import Cookies from 'js-cookie'

import TotalRev from '../visualizeComponent/TotalRev'
import BoxAbove from '../visualizeComponent/BoxAbove'
import TourRanking from '../visualizeComponent/TourRanking'
import PopularNation from '../visualizeComponent/PopularNation'
import TotalRevModal from '../visualizeComponent/Modal/TotalRevModal'
import TourRankingModal from '../visualizeComponent/Modal/TourRankingModal'
import PopNationModal from '../visualizeComponent/Modal/PopNationModal'

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
      showMoreTourRanking: false,
      showMoreNationsSummary: false,
      showTotalRevenue:false,
      selectedYear:curYear
    }
  }


  handleClickShowMoreTourRanking(){
    this.setState({showMoreTourRanking: true})
  }

  handleClickShowMoreNationsSummary(){
    this.setState({showMoreNationsSummary: true})
  }

  handleClickShowTotalRevenue(){
    this.setState({showTotalRevenue: true})
  }

  handleYearSelect(value,option){
  console.log(value)
  this.setState({selectedYear: value})
  }

  setYearRev(){
    Cookies.set('selectedYearInDashBoard',this.state.selectedYear)
    // this.getRevData(this.state.selectedYear)
    this.props.dispatch(changeYearDashBoard('CHANGE_YEAR',this.state.selectedYear))
  }


  render() {

    let closeshowMoreTourRanking = () => { this.setState({showMoreTourRanking: false}) }
    let closeshowMoreNationsSummary = () => { this.setState({showMoreNationsSummary: false}) }
    let closeshowTotalRevenue = () => { this.setState({showTotalRevenue:false}) }

    return (

      <div>

        <div className="modal-container">
            <Modal
              bsSize="large"
              show={this.state.showTotalRevenue}
              onHide={closeshowTotalRevenue}
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
              show={this.state.showMoreTourRanking}
              onHide={closeshowMoreTourRanking}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Tour Total Revenue Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TourRankingModal dispatch = {this.props.dispatch} />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container">
            <Modal
              bsSize="lg"
              show={this.state.showMoreNationsSummary}
              onHide={closeshowMoreNationsSummary}
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

        <div className="gutter-example" >
            <BoxAbove />
        </div>

        <Row gutter={16}>
         <Col span={16}>

           <div className = "year-selection">
             <Row>

               <Col span={1}  offset ={15} >
                 <Icon type="calendar" style = {{fontSize: "22px"}} />
               </Col>

               <Col span={6}>
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
                <Col span={1}>
                  <Button type = "primary" onClick = {() => this.setYearRev()}>GO!</Button>
               </Col>
            </Row>
           </div>

           <div className = "total-revenue">
             <div className = "total-revenue-label">
               <Row>
                 <Col span = {14}>
                  <h4>Total Revenue</h4>
                 </Col>
                <Col span = {1} offset = {9}>
                  <Popover placement="top" title={"See more!"}>
                    <Icon className = "read-more-button" type="ellipsis"
                      onClick = {()=> this.handleClickShowTotalRevenue()}/>
                 </Popover>
                </Col>
              </Row>
             </div>
             <TotalRev dispatch = {this.props.dispatch}/>
           </div>
         </Col>

         <Col span={8}>
           <div className = "each-tour-total-revenue">
             <div className = "each-tour-total-revenue-label">
                <Row>
                  <Col span = {14}>
                   <h4>Tour Ranking</h4>
                  </Col>
                 <Col span = {1} offset = {8}>
                   <Popover placement="top" title={"See more!"}>
                     <Icon className = "read-more-button" type="ellipsis"
                       onClick = {()=> this.handleClickShowMoreTourRanking()}/>
                  </Popover>
                 </Col>
               </Row>
             </div>
             <TourRanking dispatch = {this.props.dispatch}/>
           </div>

           <div className = "popular-nation">
             <div className = "popular-nation-label">
               <Row>
                 <Col span = {14}>
                  <h4>Popular Nation</h4>
                 </Col>
                <Col span = {1} offset = {8}>
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
