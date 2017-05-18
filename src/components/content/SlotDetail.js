import React, { Component } from 'react';

import { Row,Col,Table, Input, Button,Icon, Dropdown, Badge, Menu, Alert, Tag } from 'antd';


import { addTour } from '../../actions/action-addTour'
import { selectTourID } from '../../actions/action-selectTourID'

import apiAccess from '../../Helpers/apiAccess'
import changeDateFormat from '../../Helpers/changeDateFormat'
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux'


class SlotDetail extends Component {

  constructor(props){
    super(props)

    this.state = {
      show: false,
      selectedDate:"",
      tourList: [],
      customerList:[],
      curTour: "",
      wholeBookerAndTour:[],
      showInvalidDate: false,
      showTourDeleteWarning: false,
      curDeletingTourID: "",
      delete_status: false,
      control_addTour:false,
      filteredInfo: null,
      sortedInfo: null
    }
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }
  setParticipantSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'participants',
      },
    });
  }

  componentWillMount(){
    this.getTourAndBookerDetail()
    this.screenTourAndBooker(this.state.bookerAndTourDetail)
    this.setState({selectedDate:this.props.selectedDate})
    this.setState({valid_date_status:this.props.valid_date_status})
    this.setState({delete_status:this.props.delete_status})
  }

  warningDeleteEachTour(record){
    let _id = record.id
    this.setState({curDeletingTourID: _id})
    this.setState({showTourDeleteWarning:true})
  }


  deleteEachTour(_id){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/delete-bookedtour/'+_id,
      method: 'DELETE',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'DELETE_BOOKER_AND_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'DELETE_BOOKER_AND_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'DELETE_BOOKER_AND_TOUR_FAILED' })
    })
  }


  getTourAndBookerDetail(){
    let date = changeDateFormat(this.props.selectedDate)
    apiAccess({
      url: 'http://localhost:8000/bookedtours/date/'+date,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_BOOKER_AND_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_BOOKER_AND_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_BOOKER_AND_TOUR_FAILED' })
    })
  }

  componentWillReceiveProps(nextProps){

    if(this.props.showAddTourModal == nextProps.showAddTourModal){
      this.setState({control_addTour:true})
    }

    if(this.props.addBookerAndTour !== nextProps.addBookerAndTour){
      if(nextProps.addBookerAndTour){
        this.getTourAndBookerDetail()
        //this.props.dispatch(addTour("CLOSE_ADD_TOUR"))
      }
    }

    if(this.props.bookerAndTourDetail !== nextProps.bookerAndTourDetail){
      if(nextProps.bookerAndTourDetail){
        this.setState({bookerAndTourDetail:nextProps.bookerAndTourDetail})
        this.screenTourAndBooker(nextProps.bookerAndTourDetail)
      }
    }
    this.setState({wholeBookerAndTour: nextProps.bookerAndTourDetail})

    if(this.props.delete_status !== nextProps.delete_status){
      if(nextProps.delete_status){
        this.getTourAndBookerDetail()
        this.setState({showTourDeleteWarning: false})
        this.props.dispatch(addTour("CLOSE_ADD_TOUR"))
      }
    }

  }

  addMoreTour(){
      this.props.dispatch(addTour('ADD_TOUR',this.props.selectedDate))
  }

  checkUnassignedGuide(guide){
    if(guide == "" || typeof guide === 'undefinded' || guide == null){
      return(
        <Tag color="red">Unassigned</Tag>
      )
    }else {
      return(
        <div>{guide}</div>
      )
    }
  }

  screenTourAndBooker(data){
    let tours = []
    let customers = []

    if(data!=null){
      for(var i = 0; i < data.length; i++) {

        let total_p = 0;
        for(var j =0; j < data[i].customers.length; j++){
          total_p += data[i].customers[j].participants
        }

        let guide =''
        if(typeof data[i].tour_guide !== null && typeof data[i].tour_guide !== 'undefined' ){
          if(data[i].tour_guide && typeof data[i].tour_guide.fullname !== 'undefined'){
              guide = data[i].tour_guide.fullname
          }
        }else {
          guide = ''
        }


        var tourDetail = {
          key: i,
          id: data[i]._id,
          start_date: data[i].start_date,
          start_time: data[i].start_time,
          tour_name: data[i].tour_name,
          tour_type: data[i].tour_type,
          tour_period: data[i].tour_period,
          guide: guide,
          participants: total_p
        }
        tours[i] = tourDetail
    }
  }

  if(this.refs.addTourTable){
    this.setState({
      tourList: tours
    })
  }

}

getCurTour(record){
  let id = record.id
  apiAccess({
    url: 'http://localhost:8000/bookedtours/'+id,
    method: 'GET',
    payload: null,
    attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_ATTEMPT' }),
    successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_SUCCESS', json }),
    failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_FAILED' })
  })
}

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    let onClose = () => this.setState({showInvalidDate:false})
    let closeTourDeleteWarning = () => {
      this.setState({showTourDeleteWarning: false})
    }


    let delete_c_title = "You are going to delete the tour " + this.state.curTour
    let delete_c_content = "If you delete it, the information will be permanently gone !!!"

    const columns = [

      { title: 'Time', dataIndex: 'start_time', key: 'start_time', width: 70 },
      { title: 'Tour', dataIndex: 'tour_name', key: 'tour_name' , width: 200,
        filters: [
         { text: 'zhejiang', value: 'zhejiang' },
         { text: 'jiangsu', value: 'jiangsu' }
        ],
         filteredValue: filteredInfo.tour_name || null,
         onFilter: (value, record) => record.tour_name.includes(value)
      },
      { title: 'Type', dataIndex: 'tour_type', key: 'tour_type', width: 80,
        filters: [
          { text: 'Public', value: 'Public' },
          { text: 'Private', value: 'Private' }
        ],
         filteredValue: filteredInfo.tour_type || null,
         onFilter: (value, record) => record.tour_type.includes(value)
      },
      { title: 'Period', dataIndex: 'tour_period', key: 'tour_period', width: 80,
        filters: [
          { text: 'Full-day', value: 'Full-day' },
          { text: 'Morning', value: 'Morning' },
          { text: 'Afternoon', value: 'Afternoon' },
          { text: 'Evening', value: 'Evening' }
        ],
         filteredValue: filteredInfo.tour_period || null,
         onFilter: (value, record) => record.tour_period.includes(value)
      },
      { title: 'Guide', dataIndex: 'guide', key: 'guide', width: 160,
        sorter: (a, b) => a.guide - b.guide,
        sortOrder: sortedInfo.columnKey === 'guide' && sortedInfo.order,
        render:(text,record) =>
         <div>{this.checkUnassignedGuide(record.guide)}</div>
      },
      { title: 'Participants', dataIndex: 'participants', key: 'participants', width: 100,
        sorter: (a, b) => a.participants - b.participants,
        sortOrder: sortedInfo.columnKey === 'participants' && sortedInfo.order, },
      { title: 'Action', dataIndex: '', key: 'x', width: 120,
        render: (text, record) =>
        <span>
          <Button type="primary" onClick = {() => this.getCurTour(record)}  >Edit</Button>
          <span className="ant-divider" />
          <Button type="danger" onClick = {() => this.warningDeleteEachTour(record)}  >Delete</Button>
        </span>
      }]

    return (

      <div>

      <div className="modal-container" >
          <Modal
            show={this.state.showTourDeleteWarning}
            onHide={closeTourDeleteWarning}
            bsSize="sm"
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                {delete_c_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {delete_c_content}
            </Modal.Body>

            <Modal.Footer>
             <Button type="danger" onClick = {() => this.deleteEachTour(this.state.curDeletingTourID)}>Delete</Button>
           </Modal.Footer>

          </Modal>
      </div>

      <div ref = "addTourTable" >
        <div className="table-operations">
          <Button onClick ={this.setParticipantSort}>Sort Participants</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <span>
          { this.state.showInvalidDate ?
            <Alert message="Cannot add event in the past" type="error" closable onClose={onClose}/> : null }

        <Button type="primary" className = 'add-tour' onClick={()=> this.addMoreTour() }>Add tour</Button>
        </span>
        <Table className="components-table-demo-nested" columns={columns}
          dataSource={this.state.tourList} onChange={this.handleChange}
          />
      </div>

    </div>

    );
  }
}

const mapStateToProps = (state) => ({
   addBookerAndTour: state.postBookerAndTour.addBookerAndTour,
   bookerAndTourDetail: state.getBookerAndTour.bookerAndTourDetail,
   selectedDate: state.spreadSelectedDate.selectedDate,
   valid_date_status: state.spreadSelectedDate.valid_date_status,
   delete_status: state.deletedTour.delete_status,
   showAddTourModal: state.addTourForm.showAddTourModal
})

export default connect(mapStateToProps)(SlotDetail)
