import React, { Component } from 'react';
import PropTypes from 'prop-types'

import AddNewTourModal from '../AddNewTourModal';
import { Button, Col, Row } from 'antd';

import Box from '../Box'

import { Modal, Pagination } from 'react-bootstrap';
import apiAccess from '../../Helpers/apiAccess'
import {closeAllTourBox} from '../../actions/action-closeAllTourBox'
import {connect} from 'react-redux';


Array.prototype.subarray=function(start,end){
     if(!end){ end=-1;}
    return this.slice(start, this.length+1-(end*-1));
}

class Tours extends Component {

  constructor(props){
    super(props)
    this.state = {
      tours_data: [],
      showAddNewTour: false,
      showTourBox: true,
      activePage: 1,
      tours_data_length:0,
      amount_display_tour:9,
      tours_sub_data:[]
    }
  }

  handlePaginationSelect(eventKey) {
    console.log(eventKey)
    this.setState({
      activePage: eventKey
    });

  }

  addNewTour(){
    this.setState({showAddNewTour: true})
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount(){
    this.getTours()

  }

  componentWillReceiveProps(nextProps){
    if(this.props.tours_data !== nextProps.tours_data){
      if(nextProps.tours_data){
        let len = nextProps.tours_data.length/this.state.amount_display_tour
        let final_len = Math.ceil(len)
        if(final_len<1){
          let len = 1
        }
        this.setState({tours_data_length:final_len})
        this.setState({tours_data: nextProps.tours_data})
        this.setState({tours_sub_data: nextProps.tours_data})
      }
    }
    if(nextProps.add_newTour_success_status){
      this.setState({showAddNewTour:false})
      this.getTours()
    }
  }


  getTours(){
    apiAccess({
      url: 'tours',
      method: 'GET',
      payload: null,
      attemptAction: this.props.getAllTourAttempt,
      successAction: this.props.getAllTourSuccess,
      failureAction: this.props.getAllTourFailed
    })
  }


  renderTour(data,key){
    if (data !== undefined && data.length>0) {
      const TourBox = this.TourBox


        let lastCut = key*this.state.amount_display_tour - data.length - 1
        let firstCut = (key*this.state.amount_display_tour) - this.state.amount_display_tour

        console.log(data)
        console.log(key)
        console.log(firstCut)
        console.log(lastCut)
        console.log(data.subarray(firstCut))
        console.log(data.subarray(firstCut,lastCut))

        if(data.length <= this.state.amount_display_tour){

          return data.map((item,index) => (
                <TourBox
                  dispatch = {this.props.dispatch}
                  key = {index}
                  item = {item}  />
            ));

        }else if(data.length <= key*this.state.amount_display_tour){
          let subData = data.subarray(firstCut)
          // let arr = []
          // for(let i=0;i<subData.length;i++){
          //   arr[i] = i
          // }
          return subData.map((item) => (
                <TourBox
                  dispatch = {this.props.dispatch}
                  key = {item._id}
                  item = {item}  />
            ));
        }else{
          let subData = data.subarray(firstCut, lastCut)
          // let arr = []
          // for(let i=0;i<subData.length;i++){
          //   arr[i] = i
          // }
          return subData.map((item) => (
                <TourBox
                  dispatch = {this.props.dispatch}
                  key = {item._id}
                  item = {item}  />
            ));
        }

    }else {
      return []
    }

  }

  TourBox({item, show, handleClickBox,dispatch}){
    return (
      <Col xs={24} sm={12} lg={{span:6,offset:1}} className="gutter-row">
        <Box
          dispatch = {dispatch}
          data = {item}
        />
      </Col>
    )
  }


  render() {

    let title = "Add new tour"
    let closeAddNewTour = () => this.setState({ showAddNewTour: false});

    return (

      <div className="tour-list-show-case">
        <div className="modal-container" >
          <Modal
            show={this.state.showAddNewTour}
            onHide={closeAddNewTour}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddNewTourModal />
            </Modal.Body>

          </Modal>
        </div>

        <div className = "tour-topic">
          <h2>Tours</h2>
        </div>

        <div className = "tour-table">
            <div className="gutter-example">
              <Row gutter={16}>
                {this.renderTour(this.state.tours_sub_data,this.state.activePage)}
              </Row>
            </div>
        </div>

        <div className = "tour-pagination" style={{textAlign:"center"}} >
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            bsSize="medium"
            items={this.state.tours_data_length}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handlePaginationSelect.bind(this)} />

        </div>
          <Button type = "dash" className = "btn-add-tour-form" onClick = {() => this.addNewTour()}> + </Button>


    </div>

    );
  }
}

function mapStateToProps(state) {

    return{
        tours_data: state.getTourData.tours_data,
        add_newTour_success_status: state.addNewTour.add_newTour_success_status
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTourAttempt: () => dispatch({ type: 'GET_ALL_TOUR_DATA_ATTEMPT' }),
    getAllTourSuccess: (json) => dispatch({ type: 'GET_ALL_TOUR_DATA_SUCCESS', json }),
    getAllTourFailed: () => dispatch({ type: 'GET_ALL_TOUR_DATA_FAILED' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours)
