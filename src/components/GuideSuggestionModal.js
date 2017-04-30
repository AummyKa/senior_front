import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Icon, Button  } from 'antd';
import StarRatingComponent from 'react-star-rating-component';

import apiAccess from '../Helpers/apiAccess'



const data = [{
  key: '1',
  guidename: 'John Brown',
  rating: 5,
  favorite: 5,
}, {
  key: '2',
  guidename: 'Jim Green',
  rating: 4,
  favorite: 3,
}, {
  key: '3',
  guidename: 'Joe Black',
  rating: 4,
  favorite: 2,
}];



const GuideSuggestion = React.createClass({

  getInitialState() {
    return {
      show: false,
      selectedTourName: this.props.selectedTourName,
      selectedGuide: "",
      guideList: []
    };
  },

  createGuideSuggestData(arrayJSON){
    console.log(arrayJSON)
    let resultJSON = []

    if(arrayJSON!=null){
      for(var i = 0; i < arrayJSON.length; i++) {

        var objectJSON = {
          key: i,
          guidename: arrayJSON[i].fullname,
          rating: arrayJSON[i].expert.rate,
          favorite: arrayJSON[i].favorable
        }

        resultJSON[i] = objectJSON
    }
    console.log(resultJSON)
  }
    return resultJSON
  },

  selectSuggestedGuide(record){
    let selectedGuide = record.guidename

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
        tour_name: this.state.selectedTourName
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
          value={record.rating}
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
          value={record.favorite}
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
