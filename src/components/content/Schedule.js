import React, { Component } from 'react';
import { connect } from 'react-redux'
// import ShowCalendar from '../ShowCalendar'
import BigCalendar from 'react-big-calendar';

import moment from 'moment';

import SlotDetail from './SlotDetail'
import AddBookedTourForm from '../AddBookedTourForm'
import EditBookedTourForm from '../EditBookedTourForm'
import EditCurCustomerModal from '../EditCurCustomerModal'
import AddMoreCustomerModal from '../AddMoreCustomerModal'
import GuideSuggestionModal from '../GuideSuggestionModal'

import apiAccess from '../../Helpers/apiAccess'
import { getSelectedDate } from '../../actions/action-selectedDate'
import {editCustomerModal} from '../../actions/action-editCustomerModal'
import { addTour } from '../../actions/action-addTour'
import { sendSuggestedGuideName } from '../../actions/action-sendSuggestedGuideName'
import {addCustomerModal} from '../../actions/action-addCustomerModal'

import{ Row,Col, Select, Button } from 'antd'
import { Modal } from 'react-bootstrap';

import Cookies from 'js-cookie'

require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment);


const Option = Select.Option;
const filter = ["Guide","Tour","All"]

function throwOptionFilterObject(filter){
  let temp =[]
  if(filter){
    for (let i = 0; i < filter.length; i++) {
      temp.push(<Option key= {i}>{filter[i]}</Option>);
    }
  }
  return temp
}

function throwOptionTourNameObject(data){
  if(data){
    let temp = []
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}>{data[i].name}</Option>);
    }
    return temp
  }
}

function throwOptionGuideObject(data){
  let temp = []
  if(data){
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
      // if(data[i].isActive){
      //   temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
      // }
    }
  }
  return temp
}

class Schedule extends Component {

  constructor(props){
    super(props)
      this.state = {
      showSlotDetail : false,
      selectedDate: "",
      showAddTour: false,
      showEachTour: false,
      selectedTourName: "",
      events:[],
      selectedDate:"",
      receiveShowAddStatus:false,
      showCustomerEdit: false,
      editCurCustomer: [],
      showAddMoreCustomer: false,
      curTourID: '',
      addTourID: '',
      selectedFilter:'',
      tours_name:[],
      selectedTourID:'',
      each_tour_events:[],
      showSuggestGuide: false,
      guide_suggested_factors:[],
      guide_name:[],
      selectedGuideID:'',
      readyFormatDate:''

    }
  }

  componentWillMount(){
    this.getEvent();
    this.getGuideList()
  }

  showThatSlot(start){
    console.log(start)
    this.props.dispatch(getSelectedDate("GET_SELECTED_DATE",start))
    this.setState({showSlotDetail : true})
  }

  showThatSlotFromEvent(event,e){
    let start = event.start
    let cutStart = start.substring(0,10)
    let arr = cutStart.split('-')
    let reverse_arr = arr.reverse()
    let day_str = reverse_arr.toString().split(',').join(' ')

    let dataPack={
      dateString: day_str,
      date_for_querry: cutStart
    }

    console.log(dataPack)

    this.props.dispatch(getSelectedDate("GET_SELECTED_DATE_FROM_EVENT",dataPack))
    this.setState({showSlotDetail : true})

  }

  getEvent(){
    apiAccess({
      url: 'bookedtours/calendar/public-private',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_EVENT_SUMMARY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_EVENT_SUMMARY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_EVENT_SUMMARY_FAILED' })
    })
  }

  getAllTourName(){
    apiAccess({
      url: 'tours/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_FAILED' })
    })
  }

  getGuideList(){
    apiAccess({
      url: 'staffs/tour-guides/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_NAME_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_FAILED' })
    })
  }

  eventStyleGetter(event, start, end, isSelected) {

  let backgroundColor = event.hexColor
  let title = event.title

  if(title.match('Public')){
    backgroundColor = '#' + '27c518';
  }else if(title.match('Private')){
    backgroundColor = '#' + '0590c8';
  }
    let style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}

handleFilterSelect(value,option){
  this.setState({selectedFilter: filter[value]})
  if(filter[value]=="Tour"){
    this.getAllTourName()
  }else if(filter[value]=="All"){
    this.getEvent()
  }
}

handleTourIDSelect(value,option){
  this.setState({selectedTourID: this.state.tours_name[value]._id})
}

handleGuideSelect(value,option){
  this.setState({ selectedGuideID: this.state.guide_name[value]._id});
  // this.setState({ selectedGuideID: this.state.guide_name[value]._id})
}



filterSchedule(selected){
  apiAccess({
    url: 'bookedtours/calendar/'+selected+'/public-private',
    method: 'GET',
    payload: null,
    attemptAction: () => this.props.dispatch({ type: 'GET_FILTERED_EVENT_SUMMARY_ATTEMPT' }),
    successAction: (json) => this.props.dispatch({ type: 'GET_FILTERED_EVENT_SUMMARY_SUCCESS', json }),
    failureAction: () => this.props.dispatch({ type: 'GET_FILTERED_EVENT_SUMMARY_FAILED' })
  })

}
//
// filterGuide(){
//   let selected_Guide = this.state.selectedG
//
//   apiAccess({
//     url: 'bookedtours/calendar/'+selected_Tour+'/public-private',
//     method: 'GET',
//     payload: null,
//     attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_EVENT_SUMMARY_ATTEMPT' }),
//     successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_EVENT_SUMMARY_SUCCESS', json }),
//     failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_EVENT_SUMMARY_FAILED' })
//   })
//
// }

  componentWillReceiveProps(nextProps){

    if(this.props.showAddTourModal !== nextProps.showAddTourModal){
      if(nextProps.showAddTourModal){
        this.setState({showEachTour: false, showAddTour:true,showSlotDetail : false, showCustomerEdit:false,
        showAddMoreCustomer: false, showSuggestGuide:false})
      }
    }

    if(this.props.eachTourState !== nextProps.eachTourState){
      if(nextProps.eachTourState){
        this.setState({showEachTour: true, showAddTour:false,showSlotDetail : false,
          showCustomerEdit:false, showAddMoreCustomer: false,showSuggestGuide:false})
      }
    }

    if(this.props.eachTour !== nextProps.eachTour){
      if(nextProps.eachTour){
          this.setState({selectedTourName: nextProps.eachTour.tour_name})
          this.setState({curTourID: nextProps.eachTour._id})
          Cookies.set('cur_tour_id',nextProps.eachTour._id)
      }
    }
    if(nextProps.events){
      if(this.props.events !== nextProps.events){
        this.setState({events: nextProps.events})
      }
    }
    if(this.props.addBookerAndTour !== nextProps.addBookerAndTour){
      if(nextProps.addBookerAndTour){
          this.getEvent()
          this.setState({showEachTour: false, showAddTour:false,showSlotDetail : true, showCustomerEdit:false
            ,showAddMoreCustomer: false, showSuggestGuide:false})
          this.props.dispatch(addTour("CLOSE_ADD_TOUR"))
          // this.props.dispacth(addTour("STOP_COUNT_ADD_TOUR"))
      }
    }
    if(this.props.delete_status !== nextProps.delete_status){
      if(nextProps.delete_status){
        this.getEvent()
      }
    }

    if(nextProps.selectedDate){
        this.setState({selectedDate: nextProps.selectedDate})
    }

    if(this.props.readyFormatDate !== nextProps.readyFormatDate){
      if(nextProps.readyFormatDate){
        this.setState({readyFormatDate:nextProps.readyFormatDate})
      }
    }

    if(this.props.showEditCustomer !== nextProps.showEditCustomer){
      if(nextProps.showEditCustomer){
        this.setState({showEachTour: false, showAddTour:false, showSlotDetail: false,
          showCustomerEdit: true,showAddMoreCustomer: false, showSuggestGuide:false})
      }
    }

    if(this.props.customerData !== nextProps.customerData){
      if(nextProps.customerData){
        this.setState({editCurCustomer: nextProps.customerData})
      }
    }

    if(this.props.showAddCustomer !== nextProps.showAddCustomer){
      if(nextProps.showAddCustomer){
        this.setState({showEachTour: false, showAddTour:false, showSlotDetail: false,showCustomerEdit: false
          ,showAddMoreCustomer: true, showSuggestGuide:false})
      }
    }

    if(this.props.addTourID !== nextProps.addTourID){
      if(nextProps.addTourID){
        this.setState({addTourID: nextProps.addTourID})
      }
    }

    if(this.props.addCustomerSuccess !== nextProps.addCustomerSuccess){
      if(nextProps.addCustomerSuccess){
        this.getEvent()
        this.setState({showEachTour: true, showAddTour:false,showSlotDetail: false, showCustomerEdit:false,
          showAddMoreCustomer: false, showSuggestGuide:false})
        this.props.dispatch(addCustomerModal("CLOSE_ADD_CUSTOMER"))
      }
    }

    if(this.props.editCustomerInTourStatus !== nextProps.editCustomerInTourStatus){
      if(nextProps.editCustomerInTourStatus){
        this.setState({showEachTour: true, showAddTour:false,showSlotDetail: false, showCustomerEdit:false,
          showAddMoreCustomer: false,showSuggestGuide:false})
        this.props.dispatch(editCustomerModal("CLOSE_EDIT_CUSTOMER"))
      }
    }

    if(this.props.all_tours_name !== nextProps.all_tours_name){
      if(nextProps.all_tours_name){
        console.log(throwOptionTourNameObject(nextProps.all_tours_name))
        this.setState({tours_name:nextProps.all_tours_name})
      }
    }

    if(this.props.eachGuideName !== nextProps.eachGuideName){
      if(nextProps.eachGuideName){
        this.setState({guide_name: nextProps.eachGuideName})
      }
    }

    if(this.props.eachFilteredEventsSummary !== nextProps.eachFilteredEventsSummary){
      if(nextProps.eachFilteredEventsSummary){
        this.setState({events:nextProps.eachFilteredEventsSummary})
      }
    }

    if(this.props.showSuggestGuideModalStatus !== nextProps.showSuggestGuideModalStatus ){
      if(nextProps.showSuggestGuideModalStatus==true){
        this.setState({showEachTour: false, showAddTour:true,showSlotDetail: false,
        showCustomerEdit:false,showAddMoreCustomer: false, showSuggestGuide:true})

      }
      if(nextProps.showSuggestGuideModalStatus==false){
        this.setState({showEachTour: false, showAddTour:true,showSlotDetail: false,
        showCustomerEdit:false,showAddMoreCustomer: false, showSuggestGuide:false})
      }
    }

    if(this.props.showSuggestGuideModalFromEditStatus !== nextProps.showSuggestGuideModalFromEditStatus){
      if(nextProps.showSuggestGuideModalFromEditStatus==true){
        this.setState({showSuggestGuide:true,showEachTour: true, showAddTour:false,showSlotDetail: false,
        showCustomerEdit:false,showAddMoreCustomer: false})

      }
      if(nextProps.showSuggestGuideModalFromEditStatus==false){
        this.setState({showEachTour: true, showAddTour:false,showSlotDetail: false,
        showCustomerEdit:false,showAddMoreCustomer: false, showSuggestGuide:false})
      }
    }

    if(this.props.guide_suggested_factors !== nextProps.guide_suggested_factors){
      if(nextProps.guide_suggested_factors){
        this.setState({guide_suggested_factors: nextProps.guide_suggested_factors})
      }
    }


  }

  render() {

    let closeSlot = () => {
      this.setState({showSlotDetail: false, showEachTour: false, showAddTour: false, showCustomerEdit:false,showAddMoreCustomer: false})
    }

    let closeAddTour = () =>{
      this.setState({showAddTour: false,showSlotDetail: true ,showEachTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
      this.props.dispatch(addTour("CLOSE_ADD_TOUR"))
    }
    let closeEachTour = () =>{
      this.setState({showEachTour: false,showSlotDetail: true, showAddTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
    }

    let closeCustomerEdit = () => {
      this.setState({showEachTour: true,showSlotDetail: false, showAddTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
      this.props.dispatch(editCustomerModal("CLOSE_EDIT_CUSTOMER"))
    }

    let closeAddMoreCustomer = () => {
      this.setState({showEachTour: true,showSlotDetail: false, showAddTour:false, showCustomerEdit:false, showAddMoreCustomer: false});
      this.props.dispatch(addCustomerModal("CLOSE_ADD_CUSTOMER"))
    }

    let closeSuggestGuide = () => {
      this.setState({showSuggestGuide:false});
      this.props.dispatch(addCustomerModal("CLOSE_ADD_CUSTOMER"))
    }

    return (

      <div className="schedule-popup-container">

        <Modal
          show={this.state.showSuggestGuide}
          onHide={closeSuggestGuide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Body>
            <GuideSuggestionModal dispatch = {this.props.dispatch}
              selectedTourName = {this.state.guide_suggested_factors.selectedTourName}
              selectedTourPeriod = {this.state.guide_suggested_factors.selectedTourPeriod}
              selectedStartDate = {this.state.guide_suggested_factors.selectedStartDate}
              page={this.state.guide_suggested_factors.page}
              />
          </Modal.Body>

        </Modal>

        <div className="modal-container" >
            <Modal
              show={this.state.showAddMoreCustomer}
              onHide={closeAddMoreCustomer}
              bsSize="lg"
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                  Add More Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{backgroundColor:'#ebe9e7'}}>
                <AddMoreCustomerModal dispatch = {this.props.dispatch} addTourID = {this.state.addTourID} />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container" >
            <Modal
              show={this.state.showCustomerEdit}
              onHide={closeCustomerEdit}
              bsSize="lg"
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                  Edit Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{backgroundColor:'#ebe9e7'}}>
                 <EditCurCustomerModal eachCurCustomer ={this.state.editCurCustomer} curTourID = {this.state.curTourID}  />
              </Modal.Body>

            </Modal>
        </div>

        <div className="modal-container" >
            <Modal
              show={this.state.showAddTour}
              onHide={closeAddTour}
              bsSize = "large"
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Add Tour Booking: {this.state.selectedDate}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <AddBookedTourForm dispatch = {this.props.dispatch} />

              </Modal.Body>

            </Modal>
          </div>

          <div className="modal-container" >
              <Modal
                show={this.state.showEachTour}
                onHide={closeEachTour}
                bsSize = "large"
                container={this}
                aria-labelledby="contained-modal-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">
                    {this.state.selectedTourName} at {this.state.selectedDate}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <EditBookedTourForm selectedDate = {this.state.selectedDate}
                                      readyFormatDate = {this.state.readyFormatDate}
                                      eachTourData = {this.props.eachTour} />
                </Modal.Body>

              </Modal>
          </div>

      <div className="modal-container">
          <Modal
            bsSize = "lg"
            aria-labelledby="contained-modal-title-lg"
            show={this.state.showSlotDetail}
            onHide={closeSlot}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Tour Lists: {this.state.selectedDate} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SlotDetail dispatch = {this.props.dispatch} />
            </Modal.Body>

          </Modal>
      </div>

      <div className = "schedule-container" >
         <div className = "schedule-filter">
           <Row>
             <Col span ={2}>
                <h2>Schedule</h2>
             </Col>
             <Col xs={{ span: 6, offset: 10 }} lg={{ span: 5, offset: 17 }} style={{zIndex:'100'}}>
             <div>
               <div style = {{fontSize:'18px'}}>Filter:</div>
                 <Select
                    showSearch
                    style={{width: 150}}
                    placeholder="Filter"
                    optionFilterProp="children"
                    onSelect={this.handleFilterSelect.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                   {throwOptionFilterObject(filter)}
                  </Select>
             </div>

                {this.state.selectedFilter == "Tour" ?

                  <div className = "tour-name-filter" style ={{marginTop:'2%'}}>
                   <Row>
                    <Col span = {19}>
                     <Select
                       showSearch
                       style={{width: 150}}
                       placeholder="Tour Name"
                       optionFilterProp="children"
                       onSelect={this.handleTourIDSelect.bind(this)}
                       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                     >
                      {throwOptionTourNameObject(this.state.tours_name)}
                     </Select>
                   </Col>
                     <Col span={1}>
                       <Button type='primary' onClick = {()=>this.filterSchedule(this.state.selectedTourID)}>Go!</Button>
                     </Col>
                   </Row>
                  </div>
                   :
                   null
                }

                {this.state.selectedFilter == "Guide" ?

                  <div className = "guide-name-filter" style ={{marginTop:'2%'}}>
                   <Row>
                    <Col span = {19}>
                     <Select
                       showSearch
                       style={{width: 150}}
                       placeholder="Guide Name"
                       optionFilterProp="children"
                       onSelect={this.handleGuideSelect.bind(this)}
                       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                     >
                      {throwOptionGuideObject(this.state.guide_name)}
                     </Select>
                   </Col>
                     <Col span={1}>
                       <Button type='primary' onClick = {()=>this.filterSchedule(this.state.selectedGuideID)}>Go!</Button>
                     </Col>
                   </Row>
                  </div>
                   :
                   null
                }

             </Col>
           </Row>
         </div>

          <Row>
            <Col span = {24} style = {{height: 450}}>

                <div className = "big-table">
                    <h3 className='callout'></h3>
                  <Row>
                    <div className="schedule-calendar">
                      <BigCalendar
                        selectable
                      {...this.props}
                      culture='en-GB'
                      events={this.state.events}
                      eventPropGetter={(this.eventStyleGetter)}
                      views={['month']}
                      onSelectEvent={(event,e)=> this.showThatSlotFromEvent(event,e)}
                      onSelectSlot={(slotInfo) => this.showThatSlot(slotInfo.start)}/>
                    </div>
                  </Row>
                </div>

            </Col>
            </Row>

        </div>


      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  eachFilteredEventsSummary: state.getFilteredEventSummary.eachFilteredEventsSummary,
  all_tours_name: state.getToursName.all_tours_name,
  editCustomerInTourStatus: state.editCustomerInTour.editCustomerInTourStatus,
  addCustomerSuccess: state.addNewCustomerInTour.addCustomerSuccess,
  addTourID: state.addCustomerModal.addTourID,
  showAddCustomer: state.addCustomerModal.showAddCustomer,
  showEditCustomer: state.editCustomerModal.showEditCustomer,
  customerData: state.editCustomerModal.customerData,
  showAddTourModal: state.addTourForm.showAddTourModal,
  dateTour:state.addTourForm.dateTour,
  addBookerAndTour: state.postBookerAndTour.addBookerAndTour,
  eachTourState: state.getSpecificBookedTour.eachTourState,
  eachTour: state.getSpecificBookedTour.eachTour,
  selectedDate: state.spreadSelectedDate.selectedDate,
  events: state.getEventSummary.events,
  delete_status: state.deletedTour.delete_status,
  showSuggestGuideModalStatus: state.receiveSuggestedGuideName.showSuggestGuideModalStatus,
  guide_suggested_factors: state.receiveSuggestedGuideName.guide_suggested_factors,
  eachGuideName: state.getEachGuideName.eachGuideName,
  showSuggestGuideModalFromEditStatus: state.receiveSuggestedGuideName.showSuggestGuideModalFromEditStatus,
  readyFormatDate:state.spreadSelectedDate.readyFormatDate

})

export default connect(mapStateToProps)(Schedule)
