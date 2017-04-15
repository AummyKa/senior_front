import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Row,Col,Button } from 'antd';
import { Modal } from 'react-bootstrap';

import AddNewTourModal from '../AddNewTourModal';
import apiAccess from '../../Helpers/apiAccess'
import {closeAllTourBox} from '../../actions/action-closeAllTourBox'

import Box from '../Box'




class Tours extends Component {

  constructor(props){
    super(props)
    this.state = {
      tours_data: [],
      showAddNewTour: false,
      showTourBox: true
    }
  }

  addNewTour(){
    this.setState({showAddNewTour: true})
  }

  componentWillMount(){
    this.getTours()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.tours_data !== nextProps.tours_data){
      this.setState({tours_data: nextProps.tours_data})
    }
    if(nextProps.add_newTour_success_status){
      this.setState({showAddNewTour:false})
    }
    if(nextProps.inVisible){
      this.setState({showTourBox: false})
    }else{
      this.setState({showTourBox: true})
    }
  }

  getTours(){
    apiAccess({
      url: 'http://localhost:8000/tours',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_FAILED' })
    })
  }

  renderTour(data){

    if (data !== undefined) {
      const TourBox = this.TourBox

      return data.map((item,index) => (
            <TourBox
              show = {this.state.show}
              handleClickBox = {this.props.handleClickBox}
              key = {index}
              item = {item}  />
        ));
    }else {
      return []
    }

  }

  TourBox({item},show,handleClickBox){
    console.log(show)
    return (
      <Col className="gutter-row" span={8}>
        <Box
          show = {show}
          handleClickBox = {handleClickBox}
          data = {item}/>
      </Col>
    )
  }


  render() {

    let title = "Add new tour"
    let closeAddNewTour = () => this.setState({ showAddNewTour: false});

    return (

      <div>
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

        <div className = "topic">
          <h2>Tours</h2>
        </div>

        <div className = "tour-table">
            <div className="gutter-example">
              <Row gutter={16}>
                {this.renderTour(this.state.tours_data)}
              </Row>
            </div>
        </div>

        <Button type = "dash" className = "btn-add-tour-form" onClick = {() => this.addNewTour()}> + </Button>

    </div>

    );
  }
}

function mapStateToProps(state) {

    return{
        tours_data: state.getTours.tours_data,
        add_newTour_success_status: state.addNewTour.add_newTour_success_status,
        inVisible: state.tourAction.inVisible
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClickBox: () => dispatch(closeAllTourBox('CLOSE_ALL_TOURS')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours)
