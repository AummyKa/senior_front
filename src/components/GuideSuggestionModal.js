import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Icon, Button  } from 'antd';
import StarRatingComponent from 'react-star-rating-component';

import apiAccess from '../Helpers/apiAccess'
import { sendSuggestedGuideName } from '../actions/action-sendSuggestedGuideName'


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

  createGuideSuggestData(arrayJSON){
    console.log(arrayJSON)
    let resultJSON = []

    if(arrayJSON!=null){
      for(var i = 0; i < arrayJSON.length; i++) {
        let guide_rate = 0
        let guide_favorable = 0

        if(typeof arrayJSON[i].expert !== 'undefined' &&
        typeof arrayJSON[i].expert.rate !== 'undefined'){
          guide_rate = arrayJSON[i].expert.rate
        }

        if(typeof arrayJSON[i].expert !== 'undefined' &&
        typeof arrayJSON[i].expert.favorable !== 'undefined'){
          guide_favorable = arrayJSON[i].expert.favorable
        }

        var objectJSON = {
          key: i,
          guidename: arrayJSON[i].fullname || '',
          rating: guide_rate,
          favorite: guide_favorable
        }

        resultJSON[i] = objectJSON
    }
    console.log(resultJSON)
  }
    return resultJSON
  },

  selectSuggestedGuide(record){
    console.log(record)
    this.setState({selectedGuide:record.guidename})

    if(this.state.page == "add"){
      this.props.dispatch(sendSuggestedGuideName("SEND_SUGGESTED_GUIDE_NAME",record.guidename))
    }else if(this.state.page == "edit"){
      this.props.dispatch(sendSuggestedGuideName("SEND_SUGGESTED_GUIDE_NAME_FROM_EDIT",record.guidename))
    }

  },

  componentWillMount(){
    this.getSuggestion()
  },

  componentWillReceiveProps(nextProps){
    console.log(nextProps.listGuideSuggestion)
    if(this.props.listGuideSuggestion !== nextProps.listGuideSuggestion){
      if(nextProps.listGuideSuggestion){
        this.setState({guideList: nextProps.listGuideSuggestion})
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
      title: 'favorite', dataIndex: 'favorite',
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
      },{ title: 'Action', dataIndex: '', key: 'x',
          render: (text, record) =>
          <span><Button type="primary" onClick = {() => this.selectSuggestedGuide(record)}>Select</Button></span>
      }];

    return (

    <div>
      <Table columns={columns} dataSource={this.createGuideSuggestData(this.state.guideList)} size="small" pagination = {false} />
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
