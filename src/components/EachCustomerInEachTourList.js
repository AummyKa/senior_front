import React, { Component } from 'react';
import createFragment from 'react-addons-create-fragment';

import {connect} from 'react-redux';

import { Table, InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker,Alert } from 'antd';
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import changeDateFormat from '../Helpers/changeDateFormat'

import {Modal } from 'react-bootstrap';

import Cookies from 'js-cookie'




class EditBookedTourForm extends Component{


constructor(props){
  super(props)
  this.state={
    customerItems:[]
  }
}





  componentWillReceiveProps(nextProps){

  }

  componentWillMount(){


  }

  render(){

    this.state.customerItems = keys.map((k, index) => {
      return (

        <div className="customer-list-container">

        </div>

      );

    });


   return (


   );
 }

function mapStateToProps(state) {

    return {


    };
}

export default connect(mapStateToProps)(EditBookedTourForm);
