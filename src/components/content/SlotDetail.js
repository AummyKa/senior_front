import React, { Component } from 'react';

import { Row,Col,Table, Input, Button,Icon, Dropdown, Badge, Menu } from 'antd';
import { addTour } from '../../actions/action-addTour'
import apiAccess from '../../Helpers/apiAccess'
import changeDateFormat from '../../Helpers/changeDateFormat'

import { connect } from 'react-redux'

import AddTourForm from '../AddTourForm';


class SlotDetail extends Component {

  constructor(props){
    super(props)
    this.columns = [

      { title: 'Date', dataIndex: 'start_date', key: 'start_date', width: 100 },
      { title: 'Time', dataIndex: 'start_time', key: 'start_time', width: 70 },
      { title: 'Tour', dataIndex: 'tour_name', key: 'tour_name' , width: 200  },
      { title: 'Type', dataIndex: 'tour_type', key: 'tour_type', width: 80 },
      { title: 'Guide', dataIndex: 'guide', key: 'guide', width: 179 },
      { title: 'Participants', dataIndex: 'participants', key: 'participants', width: 100 },
      { title: 'Action', dataIndex: '', key: 'x', width: 100,
        render: (text, record) =>
        <span>
          <Button type="danger" onClick = {() => this.deleteEachTour(record)}  >Delete</Button>
        </span>
      }]

    this.state = {
      show: false,
      tourList: [],
      customerList:[],
      curTour: "",
      wholeBookerAndTour:[]
    }
  }

  componentWillMount(){
    this.getTourAndBookerDetail()
    this.screenTourAndBooker()
  }

  deleteEachTour(record){
    console.log(record)
  }

  getTourAndBookerDetail(){

    let date = changeDateFormat(this.props.selectedDate)
    console.log(changeDateFormat(this.props.selectedDate))
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
    if(this.props.bookerAndTourDetail !== nextProps.bookerAndTourDetail){
      console.log(nextProps.bookerAndTourDetail)
      this.screenTourAndBooker(nextProps.bookerAndTourDetail)
    }
    this.setState({wholeBookerAndTour: nextProps.bookerAndTourDetail})
  }

  addMoreTour(){
      this.props.dispatch(addTour('ADD_TOUR',this.props.selectedDate))
  }

  screenTourAndBooker(data){

    let tours = []
    let customers = []

    if(data!=null){
      for(var i = 0; i < data.length; i++) {

        let total_p = 0;
        for(var j =0; j < data[i].customer.length; j++){
          total_p += data[i].customer[j].participants
          console.log(data[i].customer[j].participants)
        }

        var tourDetail = {
          key: i,
          id: data[i]._id,
          start_date: data[i].start_date,
          start_time: data[i].start_time,
          tour_name: data[i].tour_name,
          tour_type: data[i].tour_type,
          guide: data[i].tour_guide,
          participants: total_p
        }
        console.log(tourDetail)
        tours[i] = tourDetail
    }
  }

  if(this.refs.addTourTable){
    this.setState({
      tourList: tours
    })
  }

}

getCurTour(record, index){

  let id = record.id

  apiAccess({
    url: 'http://localhost:8000/bookedtours/'+id,
    method: 'GET',
    payload: null,
    attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_ATTEMPT' }),
    successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_SUCCESS', json }),
    failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_FAILED' })
  })


}

  render() {

    return (

      <div ref = "addTourTable" >
        <Button type="primary" className = 'add-tour' onClick={()=> this.addMoreTour() }>Add tour</Button>
        <Table className="components-table-demo-nested" columns={this.columns}
          dataSource={this.state.tourList}
          onRowClick = {this.getCurTour.bind(this)}
          />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
   bookerAndTourDetail: state.getBookerAndTour.bookerAndTourDetail
})

export default connect(mapStateToProps)(SlotDetail)
