import React, { Component } from 'react';
import PropTypes from 'prop-types'


import { Button, Col, Row, Icon, Upload, message} from 'antd';
import { Modal } from 'react-bootstrap';
import apiAccess from '../Helpers/apiAccess'
import { uploadPicture } from '../actions/action-uploadPicture'

import Cookies from 'js-cookie'
// import getCurTourID from '../../actions/action-getCurTourID'
import {connect} from 'react-redux';

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

class AddTourPicture extends React.Component {

  constructor(props){
    super(props)
    this.state={
      tourId: this.props.tourId
    }
  }

  handleChange(info) {
    if (info.file.status !== 'uploading') {
      //console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
        this.props.dispatch(uploadPicture("UPLOAD_PICTURE_SUCCESS"))
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
        this.props.dispatch(uploadPicture("UPLOAD_PICTURE_FAILED"))
    }
  }

  render() {
    let insert_url = 'tours/insert-image/'+this.state.tourId

    const props = {
      action: apiConfig(insert_url),
      onChange: this.handleChange.bind(this),
      multiple: true,
    };
    return (
      <Upload {...props}>
        <Icon className="add-tour-picture-btn" type="plus-circle-o"/>
      </Upload>
    );
  }
}



function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps)(AddTourPicture)
