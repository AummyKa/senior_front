import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon } from 'antd'
import StarRatingComponent from 'react-star-rating-component';

import {connect} from 'react-redux'
import apiAccess from '../Helpers/apiAccess'


const createTable = (arrayJSON) =>{
  if(arrayJSON){
      for(var i = 0; i < arrayJSON.length; i++) {
        arrayJSON[i]["key"] = i;
      }
      return arrayJSON
  }else {
    return []
  }
}



class EachTourExpertGuideModal extends Component {

  constructor(props){
    super(props)
    this.state ={
      tour_id: this.props.tourId,
      eachTourExpertGuide:[]
    }
  }

  getEachTourExpert(){
    apiAccess({
      url: 'tours/'+ this.state.tour_id +'/tour-guide-expert',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_EXPERT_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_EACH_TOUR_EXPERT_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_EACH_TOUR_EXPERT_GUIDE_FAILED' })
    })
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.eachTourExpertGuide !== this.props.eachTourExpertGuide){
      if(nextProps.eachTourExpertGuide){
        this.setState({eachTourExpertGuide:createTable(nextProps.eachTourExpertGuide)})
      }
    }
  }

  componentWillMount(){
    this.getEachTourExpert()
  }

  render() {

    const columns = [{ title: 'Guide Name', dataIndex: 'fullname'},
                    {  title: 'Rating',dataIndex: 'rate', render: (text, record) =>
                    <span>
                      <StarRatingComponent
                        name= "rating"
                        starCount={5}
                        value={record.rate}
                        editing={false}
                        starColor= "#FFC300"
                        emptyStarColor= "#000000"
                        renderStarIcon={() => <span><Icon type="star" /></span>}
                      />
                    </span>

                    }];

    return (

       <div className = "each-tour-expert-guide">
            <Table columns={columns} dataSource={this.state.eachTourExpertGuide} size="small" />
        </div>


    );
  }
}

function mapStateToProps(state){
  return {
    eachTourExpertGuide: state.getEachTourExpertGuide.eachTourExpertGuide
  }
}

export default connect(mapStateToProps)(EachTourExpertGuideModal)
