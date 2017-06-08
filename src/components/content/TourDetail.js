import React, { Component } from 'react';
import PropTypes from 'prop-types'

import AddNewTourModal from '../AddNewTourModal';

import { Button, Col, Row, Icon, Select,Popover} from 'antd';
import { Modal } from 'react-bootstrap';
import apiAccess from '../../Helpers/apiAccess'

import EachTourRevChart from '../EachTourRevChart'
import EachTourExpertGuide from '../EachTourExpertGuide'
import EachTourCostModel from '../EachTourCostModel'
import CostModelModal from '../CostModelModal'
import EachTourPopularNation from '../EachTourPopularNation'
import EachTourEditFormModal from '../EachTourEditFormModal'
import EachTourYearlyParticipantSummary from '../EachTourYearlyParticipantSummary'
import { changeYearDashBoard } from '../../actions/action-changeYearDashBoard'
import EachTourMoreExpertGuideModal from '../EachTourMoreExpertGuideModal'
import AddTourPicture from '../AddTourPicture'

import Cookies from 'js-cookie'
// import getCurTourID from '../../actions/action-getCurTourID'
import {connect} from 'react-redux';

const Option = Select.Option;
let today = new Date();
let curYear = today.getFullYear()

const apiConfig = (url) =>{
  if(process.env.NODE_ENV == "development"){
    let server_url = "http://localhost:8000/"
    let result = "http://localhost:8000/"+url
    return result
  }else if(process.env.NODE_ENV == "production"){
    let server_url = "http://128.199.234.89:8000/"
    let result = "http://128.199.234.89:8000/"+url
    return result
  }
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

const uploadContent = "upload picture here!"


class TourDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      tour_data: [],
      showCostModelModal: false,
      tour_id: Cookies.get('tour_id'),
      selectedYear:curYear,
      showEditTourModal:false,
      tour_picture_url:''
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  getSpecificTourData(id){
    apiAccess({
      url: 'tours/'+id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_FAILED' })
    })
  }



  componentWillMount(){
    let img_url =  "tours/image/"+this.state.tour_id
    this.getSpecificTourData(this.state.tour_id)
    this.setState({tour_picture_url:apiConfig(img_url)})

  }

  componentWillReceiveProps(nextProps){
    if(this.props.tour_cur_id !== nextProps.tour_cur_id){
      this.setState({tour_id:nextProps.tour_cur_id})
    }
    if(this.props.specific_tours_data !== nextProps.specific_tours_data){
      if(nextProps.specific_tours_data){
        this.setState({tour_data:nextProps.specific_tours_data})
      }
    }

    if(this.props.postGuidePaymentEachTourStatus !== nextProps.postGuidePaymentEachTourStatus){
      if(nextProps.postGuidePaymentEachTourStatus){
        this.setState({showCostModelModal:false})
        this.getSpecificTourData(this.state.tour_id)
      }
    }

    if(this.props.updateEachTourStatus!==nextProps.updateEachTourStatus){
      if(nextProps.updateEachTourStatus){
        this.setState({showEditTourModal:false})
        this.getSpecificTourData(this.state.tour_id)
      }
    }

    if(nextProps.uploadPictureStatus){
      console.log(this.props.location.pathname)
      window.location.replace(this.props.location.pathname)
    }
  }

  showCostModelModal(){
    this.setState({showCostModelModal: true})
  }

  handleYearSelect(value,option){
  this.setState({selectedYear: value})
  this.props.dispatch(changeYearDashBoard('CHANGE_TOUR_DASHBOARD_YEAR',value))
  }

  editTour(){
    this.setState({showEditTourModal:true})
  }

  showMoreExperGuide(){
    this.setState({showMoreExpertGuideModal:true})
  }


  render() {

    let closeCostModelModal = () => { this.setState({showCostModelModal: false}) }
    let closeEditTourModal = () => { this.setState({showEditTourModal:false}) }
    let closeMoreExpertGuideModal = () => { this.setState({showMoreExpertGuideModal:false}) }


    return (

      <div>

      <div className="modal-container">
          <Modal
            show={this.state.showEditTourModal}
            onHide={closeEditTourModal}
            container={this}
            responsive={true}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Edit Tour Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EachTourEditFormModal tourId= {this.state.tour_id} dispatch = {this.props.dispatch}/>
            </Modal.Body>

          </Modal>
      </div>

      <div className="modal-container">
          <Modal
            show={this.state.showCostModelModal}
            onHide={closeCostModelModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Cost Model</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CostModelModal tourId= {this.state.tour_id} dispatch = {this.props.dispatch}/>
            </Modal.Body>

          </Modal>
      </div>

      <div className="modal-container">
          <Modal
            show={this.state.showMoreExpertGuideModal}
            onHide={closeMoreExpertGuideModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Expert Guides</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EachTourMoreExpertGuideModal dispatch={this.props.dispatch} tourId= {this.state.tour_id} />
            </Modal.Body>

          </Modal>
      </div>

      <div className = "tour_content">
        <Row>
          <Col lg ={7} xs={24} >
            <div className = "tour-picture"
              style={{backgroundImage: `url(${this.state.tour_picture_url})`,backgroundSize: 'cover' }}>
              <Popover content={uploadContent}>
                <div className="add-tour-picture">
                  <AddTourPicture dispatch={this.props.dispatch} tourId = {this.state.tour_id}/>
                  {/*<img style={{ width: '100px',height:'100px' }} src={this.state.tour_picture_url} />*/}
                </div>
             </Popover>
            </div>

            <div className = "tour-title" style = {{  fontSize: 20 }}>
              <b>{this.state.tour_data.tour_name}</b>
            </div>

            <div className = "tour-type" style = {{  fontSize: 15 }}>
              {this.state.tour_data.type}
            </div>

            <div className = "tour-description">
              {this.state.tour_data.description}
            </div>

            <div className = "cost-model">
              <div className = "cost-model-title">
                  <b>Cost Model
                    <span><Icon type="edit"
                    onClick = {()=>this.showCostModelModal()}
                    className = "btn-edit-in-tour-detail" />
                  </span></b>
              </div>
              <EachTourCostModel dispatch = {this.props.dispatch}
                                 tourId = {this.state.tour_id} />
            </div>

            <div className = "participant-data">
              <div className = "participant-tour-title"><b>Participants Record</b></div>
              <EachTourYearlyParticipantSummary  dispatch = {this.props.dispatch}
                                                 tourId = {this.state.tour_id} />
            </div>

            <div className = "expert-list">
              <div className = "expert-guide-list-title">
                <b>Expert Guide</b>
                <Popover placement="top" title={"See more!"}>
                  <Icon className = "read-more-button" type="ellipsis" style={{marginLeft:'3%'}}
                    onClick={()=>this.showMoreExperGuide()}/>
               </Popover>
              </div>
              <div className = "expert-list-table">
                <EachTourExpertGuide dispatch = {this.props.dispatch} tourId = {this.state.tour_id} />
              </div>
            </div>

          </Col>
          <Col lg={{span :16, offset:1 }} xs={24} >

            <div className = "edit-and-year-selected">
              <Row>

                <Col xs={6} lg={5}>
                  <div className ="year-title" style = {{marginTop: '-11%'}}>
                    <h3>{this.state.selectedYear}</h3>
                  </div>
                </Col>

                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 9 }}>
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
                <Col xs={{ span: 2, offset: 1 }} lg={3}>
                  <Button style={{backgroundColor:'#900C3F',color:'#ffffff'}} onClick = {() => this.editTour()}>Edit Tour!</Button>
               </Col>
             </Row>
            </div>

            { Cookies.get('userRole') == "Manager" ?
              <div className = "tour-graph">
                <div className = "tour-graph-title"><b>Tour Revenue</b></div>

                <div className = "tour-rev-chart">
                  <EachTourRevChart tourId= {this.state.tour_id} dispatch = {this.props.dispatch} />
                </div>

              </div>
              : null
            }


            <div className = "each-tour-popular-nation">
              <div className = "each-tour-popular-nation-title"><b>Popular Nation</b></div>
              <EachTourPopularNation tourId= {this.state.tour_id} dispatch = {this.props.dispatch} />
            </div>


          </Col>
        </Row>
      </div>
    </div>

    );
  }
}



function mapStateToProps(state){
  return{
    tour_cur_id: state.tourAction.tour_cur_id,
    specific_tours_data: state.getSpecificTourData.specific_tours_data,
    postGuidePaymentEachTourStatus: state.postGuidePaymentEachTour.postGuidePaymentEachTourStatus,
    selectedTourYear: state.updateYearDashBoard.selectedTourYear,
    updateEachTourStatus: state.updateEachTour.updateEachTourStatus,
    uploadPictureStatus: state.uploadPicture.uploadPictureStatus
  }
}

export default connect(mapStateToProps)(TourDetail)
