import React, { Component } from 'react';
import PropTypes from 'prop-types'


import { Button, Col, Row, Icon, Upload, message} from 'antd';
import { Modal } from 'react-bootstrap';
import apiAccess from '../Helpers/apiAccess'
import { uploadPicture } from '../actions/action-uploadPicture'

import Cookies from 'js-cookie'
// import getCurTourID from '../../actions/action-getCurTourID'
import {connect} from 'react-redux';



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
    const props = {
      action: '//localhost:8000/tours/insert-image/'+this.state.tourId,
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
