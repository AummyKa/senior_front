import React, { Component } from 'react';
import createFragment from 'react-addons-create-fragment';

import {connect} from 'react-redux';
import {editCustomerModal} from '../actions/action-editCustomerModal'

import {Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker ,Alert,Popconfirm } from 'antd';
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import changeDateFormat from '../Helpers/changeDateFormat'

import {Modal } from 'react-bootstrap';

import Cookies from 'js-cookie'




function formatData(data){
  let temp = []
  if(data){
    for(var i = 0; i < data.length; i++){
      var obj = {
        key:i+1,
        _id: data[i].booked_by._id,
        name: data[i].booked_by.name || '-',
        booking_method: data[i].booking_method || '-',
        country: data[i].booked_by.country || '-',
        email: data[i].booked_by.email || '-',
        participants: data[i].participants || '-',
        pickup_place: data[i].pickup_place || '-',
        pickup_time: data[i].pickup_time || '-',
        price: data[i].price || '-',
        phone: data[i].booked_by.phone || '-',
        remark: data[i].remark || '-'
      }
      temp[i] = obj
    }
  }
  return temp
}


class EachCustomerInEachTourList extends Component{


constructor(props){
  super(props)
  this.state={
    keys:[],
    eachCustomer:[]
  }
}


  generateKeyArray(data){
    let temp = []
    for(let i=0;i<data.length;i++){
      temp[i]=data[i].key
    }
    console.log(temp)
    return temp
  }


  componentWillMount(){
    // this.setState({keys:this.generateKeyArray()})

    this.getCurTour(Cookies.get('cur_tour_id'))
  }

  componentWillReceiveProps(nextProps){
    if(this.props.eachTour !== nextProps.eachTour){
      if(nextProps.eachTour){
        let data = formatData(nextProps.eachTour.customers)
        console.log(data)
        console.log(data[0])
        console.log(data.length)
        this.setState({eachCustomer:data})
        this.setState({keys:this.generateKeyArray(data)})
      }
    }

    if(this.props.delete_cus_status !== nextProps.delete_cus_status){
      if(nextProps.delete_cus_status){
        // this.setState({
        //   keys: this.state.keys.filter(key => key !== this.state.keys.slice(-1).pop()),
        // })
      }
    }

  }

  getCurTour(id){
    apiAccess({
      url: 'bookedtours/'+id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_BOOKED_TOUR_FAILED' })
    })
  }

  deleteCustomer(data){
    this.props.dispatch(editCustomerModal("SHOW_DELETE_CUSTOMER_MODAL",data.email))
  }


  editCustomer(data){
    this.props.dispatch(editCustomerModal("SHOW_EDIT_CUSTOMER",data))
  }


  render(){

    this.state.customerItems = this.state.keys.map((k, index) => {
      return (

        <div className="customer-info-content" key={k}>
          <Row>
            <Col span={11} >
               <h4><b>Book {k}</b></h4>
             </Col>
            <Col span={1} offset = {11}>
              <Icon style = {{ right: '4%' }} type="edit"
                 className="dynamic-edit-button"
                 onClick={()=>this.editCustomer(this.state.eachCustomer[k-1])}
                 />
           </Col>
           <Col span={1}>
             <Icon style = {{ right: '1%' }}
               className="dynamic-delete-button"
               type="minus-circle-o"
               onClick={()=>this.deleteCustomer(this.state.eachCustomer[k-1])}
             />

          </Col>
         </Row>
          <Row gutter={16}>
            <Col span={3}>
              <div className="customer-info-label">Name</div>
              <div className="customer-info-label">Email</div>
              <div className="customer-info-label">Pickup place</div>
              <div className="customer-info-label">Price</div>
            </Col>
            <Col span={5}>
              <div>{this.state.eachCustomer[k-1].name}</div>
              <div>{this.state.eachCustomer[k-1].email}</div>
              <div>{this.state.eachCustomer[k-1].pickup_place}</div>
              <div>{this.state.eachCustomer[k-1].price}</div>
            </Col>
            <Col span={3}>
              <div className="customer-info-label">Booking Method</div>
              <div className="customer-info-label">Phone</div>
              <div className="customer-info-label">Pickup time</div>

            </Col>
            <Col span={5}>
              <div>{this.state.eachCustomer[k-1].booking_method}</div>
              <div>{this.state.eachCustomer[k-1].phone}</div>
              <div>{this.state.eachCustomer[k-1].pickup_time}</div>

            </Col>
            <Col span={3}>
              <div className="customer-info-label">Country</div>
              <div className="customer-info-label">Participant</div>
              <div className="customer-info-label">Remark</div>
            </Col>
            <Col span={5}>
              <div>{this.state.eachCustomer[k-1].country}</div>
              <div>{this.state.eachCustomer[k-1].participants}</div>
              <div>{this.state.eachCustomer[k-1].remark}</div>
            </Col>
          </Row>
        </div>

      );

    });

    return (
      <div>
        {this.state.customerItems}
      </div>
    );
  }
}




function mapStateToProps(state) {

    return {
      eachTour: state.getSpecificBookedTour.eachTour,
      delete_cus_status: state.deleteCurCustomerInTour.delete_cus_status

    };
}

export default connect(mapStateToProps)(EachCustomerInEachTourList);
