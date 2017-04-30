import React, { Component } from 'react';
import { Table, Input, Popconfirm, Icon, Button, Select } from 'antd';
import {connect} from 'react-redux';

import apiAccess from '../Helpers/apiAccess'


function throwOptionTourNameObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].name}</Option>);
  }
  return temp
}



class AddRatingEditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
    listAllTourName: []
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }

  componentWillMount(){
   this.getAllTourName()
 }

 componentWillReceiveProps(nextProps){
   if(this.props.tours_data !== nextProps.tours_data){
     if(nextProps.tours_data){
       console.log(nextProps.tours_data)
       this.setState({listAllTourName: nextProps.tours_data})
     }
   }
 }

 getAllTourName(){
    apiAccess({
      url: 'http://localhost:8000/tours/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_FAILED' })
    })
  }


 handleTourNameSelect(value,option){
   console.log(value)
 }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Select
                 showSearch
                 defaultValue = {value}
                 placeholder="Select a tour"
                 optionFilterProp="children"
                 onSelect = {this.handleTourNameSelect}
                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
               >
                {throwOptionTourNameObject(this.state.listAllTourName)}
               </Select>
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      tours_data: state.getTours.tours_data
  }
}

export default connect(mapStateToProps)(AddRatingEditableCell)
