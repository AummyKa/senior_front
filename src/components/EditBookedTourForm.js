import React, { Component } from 'react';
import createFragment from 'react-addons-create-fragment';

import {connect} from 'react-redux';

import { Table, InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker,Alert } from 'antd';
import moment from 'moment';

import EachCustomerInEachTourList from './EachCustomerInEachTourList'

import apiAccess from '../Helpers/apiAccess'
import changeDateFormat from '../Helpers/changeDateFormat'

import {editCustomerModal} from '../actions/action-editCustomerModal'
import {addCustomerModal} from '../actions/action-addCustomerModal'
import { sendSuggestedGuideName } from '../actions/action-sendSuggestedGuideName'

import {Modal } from 'react-bootstrap';

import Cookies from 'js-cookie'
var countries = require('country-list')();

import CustomerInput from './CustomerInput'

const FormItem = Form.Item;
const Option = Select.Option;
const format = 'HH:mm';
const countryList = countries.getData()



const tourtypes = [{
  value: 'Public',
  label: 'Public',
}, {
  value: 'Private',
  label: 'Private',
}]

const tour_period = [{
  value: 'Full-Day',
  label: 'Full-Day',
}, {
  value: 'Morning',
  label: 'Morning',
}, {
  value: 'Afternoon',
  label: 'Afternoon',
}, {
  value: 'Evening',
  label: 'Evening',
}]


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function getGuideName(list,resultJSON){

  if (list) {
    for(var i = 0; i < list.length; i++) {
      var objectJSON = {
        name: list[i].fullname
      }
      resultJSON[i] = objectJSON
    }
  }
}

function throwOptionGuideObject(data){
  let temp = []
  if(data){
    for (let i = 0; i < data.length; i++) {
      // if(data[i].isActive){
      //   temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
      // }
      temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
    }

  }
  return temp
}

function throwOptionTourTypeObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
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



function formatData(data){
  let temp = []
  if(data){
    for(var i = 0; i < data.length; i++){
      var obj = {
        key: data[i].key,
        _id: data[i].booked_by._id,
        name: data[i].booked_by.name,
        booking_method: data[i].booking_method,
        country: data[i].booked_by.country,
        email: data[i].booked_by.email,
        participants: data[i].participants,
        pickup_place: data[i].pickup_place,
        pickup_time: data[i].pickup_time,
        price: data[i].price,
        phone: data[i].booked_by.phone,
        remark: data[i].remark
      }
      temp[i] = obj
    }
  }
  return temp
}

function throwOptionTourPeriodObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}

let uuid = 0;

const EditBookedTourForm = Form.create()(React.createClass({

  getInitialState() {
    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: 200
    },{
      title: 'Booking Method',
      dataIndex: 'booking_method',
      width: 180,
      sorter: (a, b) => a.booking_method - b.booking_method,
    }, {
      title: 'Country',
      dataIndex: 'country',
      width: 150
    }, {
      title: 'Email',
      dataIndex: 'email',
      width: 200
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      width: 200
    }, {
      title: 'Participant',
      dataIndex: 'participants',
      width: 80
    }, {
      title: 'Pickup place',
      dataIndex: 'pickup_place',
      width: 200
    }, {
      title: 'Pickup time',
      dataIndex: 'pickup_time',
      width: 100
    },{
      title: 'Price',
      dataIndex: 'price',
      width: 100
    }, {
      title: 'Remark',
      dataIndex: 'remark',
      width: 220
    },
    { title: 'Action', dataIndex: '', key: 'x',fixed: 'right', width: 180,
      render: (text, record) =>
      <span>
        <Button type="primary" onClick = {() => this.showEdit(record)}  >Edit</Button>
        <span className="ant-divider" />
        <Button type="danger" onClick = {() => this.deleteEachCustomer(record)}  >Delete</Button>
      </span>
        }]

    return{
      showCusInput: false,
      cusLen: 0,
      guide_name: [],
      selectedTourName: '',
      selectedTourType: '',
      selectedTourTime: '',
      selectedGuide: '',
      eachTour: [],
      eachCurGuideTour:[],
      showCustomerEdit: false,
      editCurCustomer: '',
      showCustomerDeleteWarning: false,
      cusWarnIdentity: "",
      curTourID: Cookies.get('cur_tour_id'),
      cusTourDelete:"",
      showAddMoreCustomer: false,
      tours_name: [],
      selectedTourPeriod: '',
      selectedTourTime:'',
      selectedDate:this.props.selectedDate,
      selected_guide_name:'',
      showAlertUpdateSuccess:false,
      cur_cus_email:''
    }
  },

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let payload={
             start_time: this.state.selectedTourTime,
             tour_period: this.props.form.getFieldValue(`tour_period`),
             tour_name: this.props.form.getFieldValue(`tourname`),
             tour_type: this.props.form.getFieldValue(`tourtype`),
             tour_guide: this.state.selectedGuide
           }

           apiAccess({
             url: 'http://localhost:8000/bookedtours/update/'+this.state.curTourID,
             method: 'POST',
             payload: payload,
             attemptAction: () => this.props.dispatch({ type: 'UPDATE_EACH_BOOKED_TOUR_ATTEMPT' }),
             successAction: (json) => this.props.dispatch({ type: 'UPDATE_EACH_BOOKED_TOUR_SUCCESS', json }),
             failureAction: () => this.props.dispatch({ type: 'UPDATE_EACH_BOOKED_TOUR_FAILED' })
           })

         }
    });
  },


  handleTourTime(time,timeString){
    this.setState({selectedTourTime: timeString})
  },

  handleGuideSelect(value,option){
    this.setState({ selectedGuide: this.state.guide_name[value]._id});
    // this.setState({ selectedGuideID: this.state.guide_name[value]._id})
  },


  handleTourPeriodSelect(value,option){
    this.setState({ selectedTourPeriod: tour_period[value].value});
  },

  showEdit(record){
    if(this.refs.addTourForm){
      this.props.dispatch(editCustomerModal("SHOW_EDIT_CUSTOMER",record))
    }
  },

  getCurTour(id){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/'+id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_FAILED' })
    })
  },

  deleteEachCustomer(record){
    //deleteEachCustomer("DELETE_EACH_CUSTOMER_WARNING",record)
    let email = record.email
    this.setState({cusTourDelete: email})
    this.setState({showCustomerDeleteWarning: true})
  },

  deleteCustomer(tourID,cusEmail){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/delete-customer/'+tourID,
      method: 'DELETE',
      payload:{ email: cusEmail  },
      attemptAction: () => this.props.dispatch({ type: 'DELETE_CUR_CUS_IN_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'DELETE_CUR_CUS_IN_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'DELETE_CUR_CUS_IN_TOUR_FAILED' })
    })

  },

  getGuideNameList(){
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_NAME_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_FAILED' })
    })
  },



  addMoreCustomer(){
    this.props.dispatch(addCustomerModal("SHOW_ADD_CUSTOMER",this.state.curTourID))
  },

  componentWillReceiveProps(nextProps){

    if(this.props.eachGuideName !== nextProps.eachGuideName){
      this.setState({guide_name:nextProps.eachGuideName})
    }


    if(this.props.eachTour !== nextProps.eachTour){

      if(nextProps.eachTour){
        this.setState({selectedTourTime:nextProps.eachTour.start_time})
        if(typeof nextProps.eachTour.tour_guide !== 'undefined' && nextProps.eachTour.tour_guide !== null){
          this.setState({selectedGuide:<div>{nextProps.eachTour.tour_guide}</div>.props.children._id})
          this.setState({eachCurGuideTour: <div>{nextProps.eachTour.tour_guide}</div>.props.children})
          this.setState({selected_guide_name:<div>{nextProps.eachTour.tour_guide}</div>.props.children.fullname})
        }
        this.setState({eachTour:nextProps.eachTour})
      }
    }

    if(this.props.delete_cus_status !== nextProps.delete_cus_status){
      if(nextProps.delete_cus_status){
        this.setState({showCustomerDeleteWarning: false})
        this.props.dispatch(editCustomerModal("CLOSE_DELETE_CUSTOMER_MODAL"))
        this.getCurTour(this.state.curTourID)
        this.getGuideNameList()
        this.getAllTourName()
      }
    }

    if(this.props.editCustomerInTourStatus !== nextProps.editCustomerInTourStatus){
      if(nextProps.editCustomerInTourStatus){
        this.props.dispatch(editCustomerModal("CLOSE_EDIT_CUSTOMER"))
        this.getCurTour(this.state.curTourID)
        this.getGuideNameList()
        this.getAllTourName()
      }
    }

    if(this.props.addCustomerSuccess !== nextProps.addCustomerSuccess){
      if(nextProps.addCustomerSuccess){
        this.getCurTour(this.state.curTourID)
        this.getGuideNameList()
        this.getAllTourName()
      }
    }

    if(this.props.all_tours_name !== nextProps.all_tours_name){
      if(nextProps.all_tours_name){
        this.setState({tours_name: nextProps.all_tours_name})
      }
    }

    if(this.props.updateEachBookedTourStatus !== nextProps.updateEachBookedTourStatus){
      if(nextProps.updateEachBookedTourStatus){
        this.getCurTour(this.state.curTourID)
        this.getGuideNameList()
        this.getAllTourName()
        this.setState({showAlertUpdateSuccess:true})
      }
    }

    if(this.props.suggested_guide_name !== nextProps.suggested_guide_name){
      if(nextProps.suggested_guide_name){
        this.setState({selected_guide_name:nextProps.suggested_guide_name})
      }
    }
    if(this.props.suggested_guide_id !== nextProps.suggested_guide_id){
      if(nextProps.suggested_guide_id){
        this.setState({selectedGuide:nextProps.suggested_guide_id})
      }
    }

    if(this.props.showDeleteCustomerModal !== nextProps.showDeleteCustomerModal){
      if(nextProps.showDeleteCustomerModal){
        this.setState({showCustomerDeleteWarning:true})

      }
    }

    if(this.props.cur_cus_email !== nextProps.cur_cus_email){
      if(nextProps.cur_cus_email){
        this.setState({cur_cus_email:nextProps.cur_cus_email})
      }
    }

  },

  getAllTourName(){
    apiAccess({
      url: 'http://localhost:8000/tours/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_FAILED' })
    })
  },

  componentWillMount(){
    this.getGuideNameList()
    this.getCurTour(this.state.curTourID)
    this.getAllTourName()
  },

  showSuggestModal(){
    let factors ={
      selectedTourName: this.props.form.getFieldValue(`tourname`),
      selectedTourPeriod: this.props.form.getFieldValue(`tour_period`),
      selectedStartDate: changeDateFormat(this.state.selectedDate),
      page: 'edit'
    }
    this.props.dispatch(sendSuggestedGuideName("SHOW_SUGGESTED_GUIDE_MODAL",factors))
  },



  render(){

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };


    let closeEachTour = () => { this.setState({showCustomerEdit: false})}
    let closeCustomerDeleteWarning = () => this.setState({showCustomerDeleteWarning: false})
    let closeAddMoreCustomer = () => this.setState({showAddMoreCustomer: false})
    let delete_c_title = "You are going to delete the customer " + this.state.cusWarnIdentity
    let delete_c_content = "If you delete it, the information will be permanently gone !!!"

   return (

     <div>

       <div className="modal-container" >
           <Modal
             show={this.state.showCustomerDeleteWarning}
             onHide={closeCustomerDeleteWarning}
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
              <Button type="danger" onClick = {() => this.deleteCustomer(this.state.curTourID,this.state.cur_cus_email)}>
                Delete</Button>
            </Modal.Footer>

           </Modal>
       </div>

     <Form ref= "addTourForm" className = "add-tour-form" horizontal onSubmit={this.handleSubmit}>

       <Row>
      <Col span={11} offset = {1}>
       <FormItem
         {...formItemLayout}
         label="Tour Name"
       >
         {getFieldDecorator('tourname',
           { initialValue: this.state.eachTour.tour_name,
             rules: [{
               required: true,
               message: "Please select a tour name.",
             }],
           }
         )(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11 }}
              placeholder="Select a tour"
              optionFilterProp="children"
              onSelect = {this.handleTourNameSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourNameObject(this.state.tours_name)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Tour Type"
       >
         {getFieldDecorator('tourtype',
           { initialValue: this.state.eachTour.tour_type,
             rules: [{
               required: true,
               message: "Please select a tour type.",
             }],
           }
         )(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11 }}
              placeholder="Select a type of tour"
              optionFilterProp="children"
              onSelect={this.handleTourTypeSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourTypeObject(tourtypes)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Tour Period"
       >
         {getFieldDecorator('tour_period',{
           initialValue: this.state.eachTour.tour_period,
           rules: [{
             required: true,
             message: "Please select a tour period.",
           }],
         })(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11}}
              placeholder="Select a tour period"
              optionFilterProp="children"
              onSelect = {this.handleTourPeriodSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourPeriodObject(tour_period)}
            </Select>
         )}
       </FormItem>

     </Col>

      <Col span={11} offset = {1}>


         <FormItem
           {...formItemLayout}
           label="Tour Guide"
         >
         <Row gutter={10}>
            <Col span={13}>
           {getFieldDecorator('tourguide', {
             initialValue: this.state.selected_guide_name
           })(
             <Select
                showSearch
                style={{ width: '100%', marginRight: 11, marginLeft: 8 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onSelect={this.handleGuideSelect}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
               {throwOptionGuideObject(this.state.guide_name)}
              </Select>
           )}
         </Col>
          <Col span={9}>
            <Button style = {{backgroundColor: '#FFD310', color: 'white'}} onClick = {()=> this.showSuggestModal()} >
              Suggest Tour Guide!</Button>
         </Col>
   </Row>
         </FormItem>

         <FormItem
           {...formItemLayout}
           label="Start Time"
         >
           {getFieldDecorator('tourtime', {
            initialValue : moment(this.state.eachTour.start_time, format ),
             rules: [{
               required: true,
               message: "Please select a tour time.",
             }],
           })(
             <TimePicker
               style={{ width: '80%', marginRight: 11, marginLeft: 8}}
               format={format} placeholder = "tourtime"
               onChange={this.handleTourTime}
               />
           )}
         </FormItem>

       </Col>
     </Row>

       <FormItem style = {{marginBottom: '1%'}}>
         <Row>
          <Col span={16}>
            { this.state.showAlertUpdateSuccess? <Alert message="Success Tips" type="success" showIcon closable /> : null }
          </Col>
          <Col span={3} offset={2}>
            <Button type="primary" style={{width:'90%'}} htmlType="submit" >Save Edit Tour</Button>
          </Col>
          <Col span={3}>
            <Button type="primary" className = 'add-more-customer' onClick = {() => this.addMoreCustomer()}>Add More Customer</Button>
          </Col>
         </Row>
       </FormItem>

     </Form>

        <EachCustomerInEachTourList dispatch={this.props.dispatch}/>
      {/*}<Table columns={this.columns} dataSource={formatData(this.state.eachTour.customers)} scroll={{ x: 1700 }}/>*/}

     </div>
   );
 },
}));

function mapStateToProps(state) {

    return {
        all_tours_name: state.getToursName.all_tours_name,
        eachGuideName: state.getEachGuideName.eachGuideName,
        dateTour: state.addTourForm.dateTour,
        eachTour: state.getSpecificBookedTour.eachTour,
        curTourID: state.getSpecificBookedTour.curTourID,
        delete_cus_status: state.deleteCurCustomerInTour.delete_cus_status,
        editCustomerInTourStatus: state.editCustomerInTour.editCustomerInTourStatus,
        addCustomerSuccess: state.addNewCustomerInTour.addCustomerSuccess,
        updateEachBookedTourStatus: state.updateEachBookedTour.updateEachBookedTourStatus,
        suggested_guide_name: state.receiveSuggestedGuideName.suggested_guide_name,
        suggested_guide_id: state.receiveSuggestedGuideName.suggest_guide_id,
        showDeleteCustomerModal: state.editCustomerModal.showDeleteCustomerModal,
        cur_cus_email: state.editCustomerModal.cur_cus_email
    };
}

export default connect(mapStateToProps)(EditBookedTourForm);
