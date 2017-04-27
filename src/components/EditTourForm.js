import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Table, InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker } from 'antd';
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import changeDateFormat from '../Helpers/changeDateFormat'
import EditCurCustomerModal from './EditCurCustomerModal'
import AddMoreCustomerModal from './AddMoreCustomerModal'

import {Modal } from 'react-bootstrap';



import CustomerInput from './CustomerInput'

const FormItem = Form.Item;
const Option = Select.Option;
const format = 'HH:mm';

const tournames = [{
  value: 'zhejiang',
}, {
  value: 'jiangsu',
}];

const agencies = [{
  value: 'N/A',
  label: 'N/A',
}, {
  value: 'Happy',
  label: 'Happy',
},{
  value: 'Hula hula',
  label: 'Hula hula',
}];

const tourtypes = [{
  value: 'public',
  label: 'public',
}, {
  value: 'private',
  label: 'private',
}]


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function getGuideName(gList,resultJSON){

  if ("undefined" !== typeof gList) {
    for(var i = 0; i < gList.length; i++) {
      var objectJSON = {
        name: gList[i].name
      }
      resultJSON[i] = objectJSON
    }
  }

}

function throwOptionGuideObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].name}</Option>);
  }
  return temp
}

function throwOptionAgencyObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}

function throwOptionTourNameObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}

function formatData(data){
  let temp = []

  for(var i = 0; i < data.length; i++){
    var obj = {
      key: data[i].key,
      name: data[i].booked_by.name,
      agency: data[i].agency,
      country: data[i].booked_by.country,
      email: data[i].booked_by.email,
      participants: data[i].participants,
      pickup_place: data[i].pickup_place,
      pickup_time: data[i].pickup_time,
      remark: data[i].remark
    }
    temp[i] = obj
  }
  return temp
}


let uuid = 0;

const EditTourForm = Form.create()(React.createClass({

  getInitialState() {
    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: 200
    },{
      title: 'Agency',
      dataIndex: 'agency',
      width: 180,
      sorter: (a, b) => a.agency - b.agency,
    }, {
      title: 'Country',
      dataIndex: 'country',
      width: 150
    }, {
      title: 'Email',
      dataIndex: 'email',
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
      eachTour: this.props.eachTour,
      showCustomerEdit: false,
      editCurCustomer: '',
      showCustomerDeleteWarning: false,
      cusWarnIdentity: "",
      curTourID: this.props.eachTour._id,
      cusTourDelete:"",
      showAddMoreCustomer: false
    }
  },

  compoentWillMount(){
    this.getGuideList()
  },


  handleSubmit(e){
      e.preventDefault();
  },

  showEdit(record){
    if(this.refs.addTourForm){
      this.setState({editCurCustomer:record})
      this.setState({showCustomerEdit:true})
    }
  },

  getCurTour(id){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/'+id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_FAILED' })
    })
  },

  deleteEachCustomer(record){
    //deleteEachCustomer("DELETE_EACH_CUSTOMER_WARNING",record)
    let _id = record.id
    this.setState({cusTourDelete: _id})
    this.setState({showCustomerDeleteWarning: true})
  },

  deleteCustomer(tourID,cusID){
    console.log(tourID)
    console.log(cusID)
    // apiAccess({
    //   url: 'http://localhost:8000/bookedtours/delete-customer',
    //   method: 'DELETE',
    //   payload:{
    //       bookedTour: {
    //         _id: tourID
    //       },
    //       customer: {
    //         _id: cusID
    //       }
    //   },
    //   attemptAction: () => this.props.dispatch({ type: 'DELETE_CUR_CUS_IN_TOUR_ATTEMPT' }),
    //   successAction: (json) => this.props.dispatch({ type: 'DELETE_CUR_CUS_IN_TOUR_SUCCESS', json }),
    //   failureAction: () => this.props.dispatch({ type: 'DELETE_CUR_CUS_IN_TOUR_FAILED' })
    // })

  },

  addBookerAndTour(payload){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/insert',
      method: 'POST',
      payload: payload,
      attemptAction: () => this.props.dispatch({ type: 'POST_BOOKER_AND_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'POST_BOOKER_AND_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'POST_BOOKER_AND_TOUR_FAILED' })
    })
  },

  getGuideList(){
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_FAILED' })
    })
  },

  addMoreCustomer(){
    this.setState({showAddMoreCustomer:true})
  },

  componentWillReceiveProps(nextProps){

    if(this.props.guideLists !== nextProps.guideLists){
      getGuideName(nextProps.guideLists,this.state.guide_name)
    }

    if(this.props.addCustomerSuccess !== nextProps.addCustomerSuccess){
      if(nextProps.addCustomerSuccess){
        this.setState({showAddMoreCustomer: false})
        this.getCurTour(this.state.curTourID)
      }
    }

    if(this.props.eachTour !== nextProps.eachTour){
      if(nextProps.eachTour){
        this.setState({eachTour: nextProps.eachTour})
      }
    }

    if(nextProps.delete_cus_status){
      this.setState({showCustomerDeleteWarning: false})

    }
  },

  componentWillMount(){
    this.getGuideList()
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
             show={this.state.showCustomerEdit}
             onHide={closeEachTour}
             bsSize="sm"
             container={this}
             aria-labelledby="contained-modal-title"
           >
             <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title">
                 Edit Customer</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                <EditCurCustomerModal eachCurCustomer ={this.state.editCurCustomer}  />
             </Modal.Body>

           </Modal>
       </div>

       <div className="modal-container" >
           <Modal
             show={this.state.showAddMoreCustomer}
             onHide={closeAddMoreCustomer}
             bsSize="sm"
             container={this}
             aria-labelledby="contained-modal-title"
           >
             <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title">
                 Add more Customer</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <AddMoreCustomerModal dispatch = {this.props.dispatch} tourID = {this.state.curTourID} />
             </Modal.Body>

           </Modal>
       </div>

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
              <Button type="danger" onClick = {() => this.deleteCustomer(this.state.curTourID,this.state.cusTourDelete)}>
                Delete</Button>
            </Modal.Footer>

           </Modal>
       </div>

     <Form ref= "addTourForm" className = "add-tour-form" horizontal onSubmit={this.handleSubmit}>

       <Row>
      <Col span={11} offset = {1}>
       <FormItem
         {...formItemLayout}
         label="Tour name"
       >
         {getFieldDecorator('tourname', { initialValue: this.state.eachTour.tour_name })(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11 }}
              placeholder="Select a tour"
              optionFilterProp="children"
              onSelect = {this.handleTourNameSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourNameObject(tournames)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Tour Type"
       >
         {getFieldDecorator('tourtype', { initialValue: this.state.eachTour.tour_type })(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11 }}
              placeholder="Select a type of tour"
              optionFilterProp="children"
              onSelect={this.handleTourTypeSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionAgencyObject(tourtypes)}
            </Select>
         )}
       </FormItem>

     </Col>

      <Col span={11} offset = {1}>


         <FormItem
           {...formItemLayout}
           label="Tour Guide"
         >
           {getFieldDecorator('tourguide', {
             initialValue: this.state.eachTour.tour_guide
           })(
             <Select
                showSearch
                style={{ width: '80%', marginRight: 11, marginLeft: 8 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onSelect={this.handleGuideSelect}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
               {throwOptionGuideObject(this.state.guide_name)}
              </Select>
           )}
         </FormItem>

         <FormItem
           {...formItemLayout}
           label="Start Time"
         >
           {getFieldDecorator('tourtime', {
             initialValue : moment(this.state.eachTour.start_time, format )
           })(
             <TimePicker
               style={{ width: '80%', marginRight: 11, marginLeft: 8}}
               format={format} placeholder = "tourtime"
               />
           )}
         </FormItem>

       </Col>
     </Row>
     </Form>

     <Button type="primary" className = 'add-more-customer' onClick = {() => this.addMoreCustomer()}>Add more customer</Button>
     <Table columns={this.columns} dataSource={formatData(this.state.eachTour.customers)} scroll={{ x: 1500 }}/>

     </div>
   );
 },
}));

function mapStateToProps(state) {

    return {
        guideLists: state.guideDetail.guideLists,
        dateTour: state.addTourForm.dateTour,
        eachTour: state.getSpecificTour.eachTour,
        curTourID: state.getSpecificTour.curTourID,
        delete_cus_status: state.deleteCurCustomerInTour.delete_cus_status,
        addCustomerSuccess: state.addNewCustomerInTour.addCustomerSuccess
    };
}

export default connect(mapStateToProps)(EditTourForm);
