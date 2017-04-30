import React, { Component } from 'react';
import { Table, Input, Popconfirm, Icon, Button } from 'antd';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'

import AddRatingEditableCell from './AddRatingEditableCell'




class AddRatingModal extends React.Component {
  constructor(props) {
    super(props);


    // this.state = {
    //   dataSource: [{
    //     key: '0',
    //     name: 'Edward King 0',
    //     age: '32',
    //     address: 'London, Park Lane no. 0',
    //   }, {
    //     key: '1',
    //     name: 'Edward King 1',
    //     age: '32',
    //     address: 'London, Park Lane no. 1',
    //   }],
    //   count: 2,
    // };
  }

  componentWillMount(){
    this.eachGuide(Cookies.get('guide_id'))
  }

  componentWillReceiveProps(nextProps){
    console.log(this.state.favEditable)
    if(this.props.curGuideProfile !== nextProps.curGuideProfile){
      if(nextProps.curGuideProfile){
        console.log(nextProps.curGuideProfile)
        this.setState({guideProfile: nextProps.curGuideProfile})
        this.setState({guideRatingData: this.createGuideRatingData(nextProps.curGuideProfile)})
      }
    }
    // if(this.props.updateStaffStatus !== nextProps.updateStaffStatus){
    //   if(nextProps.updateStaffStatus){
    //     this.eachGuide(Cookies.get('guide_id'))
    //   }
    // }
  }

  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  eachGuide(id){
    console.log(id)
      apiAccess({
       url: 'http://localhost:8000/staffs/'+id,
       method: 'GET',
       payload: null,
       attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_ATTEMPT' }),
       successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_SUCCESS', json }),
       failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_FAILED' })
     })
  }

  render() {

    const columns = [{
        title: 'name',
        dataIndex: 'name',
        width: '60%',
        render: (text, record, index) => (
          <AddRatingEditableCell
            dispatch = {this.props.dispatch}
            value={text}
            onChange={this.onCellChange(index, 'name')}
          />
        ),
      },{
        title: 'rating',
        dataIndex: 'rating',
      }, {
        title: 'edit rating',
        dataIndex: 'editrating',
        render: (text, record, index) => {
          return (
            this.state.dataSource.length > 1 ?
            (
                <a href="#">Rate!</a>
            ) : null
          );
        },
      }];


    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
      curGuideProfile: state.guideProfile.curGuideProfile
  }
}


export default connect(mapStateToProps)(AddRatingModal)
