import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Icon, Button, Tag  } from 'antd';
import StarRatingComponent from 'react-star-rating-component';

import apiAccess from '../Helpers/apiAccess'
import { sendSuggestedGuideName } from '../actions/action-sendSuggestedGuideName'


function createGuideSuggestData(arrayJSON){
  console.log(arrayJSON)
  let resultJSON = []

  if(arrayJSON){
    for(var i = 0; i < arrayJSON.length; i++) {
      let guide_rate = 0
      let guide_favorable = 0

      if(typeof arrayJSON[i].expert !== 'undefined' &&
      typeof arrayJSON[i].expert.rate !== 'undefined'){
        guide_rate = arrayJSON[i].expert.rate
      }

      if(typeof arrayJSON[i].favorable !== 'undefined'){
        guide_favorable = arrayJSON[i].favorable
      }

      var objectJSON = {
        key: i,
        _id:arrayJSON[i]._id || '',
        guidename: arrayJSON[i].fullname || '',
        rating: guide_rate,
        favorite: guide_favorable,
        contract: arrayJSON[i].contract
      }

      resultJSON[i] = objectJSON
  }
  console.log(resultJSON)
}
  return resultJSON
}


const GuideSuggestion = React.createClass({

  getInitialState() {
    return {
      show: false,
      selectedTourName: this.props.selectedTourName,
      selectedStartDate: this.props.selectedStartDate,
      selectedTourPeriod: this.props.selectedTourPeriod,
      page: this.props.page,
      selectedGuide: "",
      guideList: []
    };
  },

  selectSuggestedGuide(record){
    console.log(record)
    this.setState({selectedGuide:record.guidename})
    var guide_id_and_name = {
      guideName: record.guidename,
      _id: record._id
    }

    if(this.state.page == "add"){
      this.props.dispatch(sendSuggestedGuideName("SEND_SUGGESTED_GUIDE_NAME",guide_id_and_name))
    }else if(this.state.page == "edit"){
      this.props.dispatch(sendSuggestedGuideName("SEND_SUGGESTED_GUIDE_NAME_FROM_EDIT",guide_id_and_name))
    }

  },

  componentWillMount(){
    this.getSuggestion()
  },

  componentWillReceiveProps(nextProps){
    console.log(nextProps.listGuideSuggestion)
    if(this.props.listGuideSuggestion !== nextProps.listGuideSuggestion){
      if(nextProps.listGuideSuggestion){
        console.log(nextProps.listGuideSuggestion)
        this.setState({guideList: createGuideSuggestData(nextProps.listGuideSuggestion)})
      }
    }

  },

  getSuggestion(){

    apiAccess({
      url: 'http://localhost:8000/bookedtours/guide-suggestion/',
      method: 'POST',
      payload: {
        tour_name: this.state.selectedTourName,
        start_date: this.state.selectedStartDate,
        tour_period: this.state.selectedTourPeriod,
      },
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_SUGGESTION_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_SUGGESTION_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_SUGGESTION_FAILED' })
    })
  },

  tagContract(contract){
    console.log(contract)
    if(contract == "Part Time"){
      return(
        <Tag color="#FDAA5C">Part Time</Tag>
      )

    }else if(contract == "Full Time."){
      return(
        <Tag color="#82D8EB">Full Time</Tag>
      )
    }
  },

  render() {

    const columns = [{
      title: 'Guide Name',
      dataIndex: 'guidename',
    },{
      title: 'Rating', dataIndex: 'rating',
      render: (text, record) =>
      <span>
        <StarRatingComponent
          name="rating"
          starCount={5}
          value={record.rating || 0}
          editing={false}
          starColor= "#FDDC02"
          emptyStarColor= "#000000"
          renderStarIcon={() => <span><Icon type="star" /></span>}
        />
      </span>
    },{
      title: 'Favorite', dataIndex: 'favorite',
      render: (text, record) =>
      <span>
        <StarRatingComponent
          name="favorite"
          starCount={5}
          value={record.favorite || 0}
          editing={false}
          starColor= "#FDDC02"
          emptyStarColor= "#000000"
          renderStarIcon={() => <span><Icon type="star" /></span>}
        />
      </span>
      },{
        title: 'Contract',
        dataIndex: 'contract',
        render: (text, record) =>
        <div>
          {this.tagContract(record.contract)}
        </div>
      },{ title: 'Action', dataIndex: '', key: 'x',
          render: (text, record) =>
          <span><Button type="primary" onClick = {() => this.selectSuggestedGuide(record)}>Select</Button></span>
      }];

    return (

    <div>
      <Table columns={columns} dataSource={this.state.guideList} size="small" pagination = {false} />
    </div>
    );
  },
});

function mapStateToProps(state){
  return{
    listGuideSuggestion: state.getSuggestGuide.listGuideSuggestion
  }
}


export default connect(mapStateToProps)(GuideSuggestion);
