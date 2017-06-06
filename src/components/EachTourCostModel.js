import React, { Component } from 'react';
import PropTypes from 'prop-types'


import { Button, Col, Row, Table} from 'antd';
import { Modal } from 'react-bootstrap';

import Cookies from 'js-cookie'
import apiAccess from '../Helpers/apiAccess'
import {connect} from 'react-redux';



const createCostModelTable = (guide_payment) =>{

  if(guide_payment!=null){
        let key = 0;
        let data = [];
        let first_participant_temp, last_participant_temp, fee_temp;

        for(var i=0; i < guide_payment.length; i++){

          if(i==0){
            first_participant_temp = guide_payment[i].participants,
            fee_temp = guide_payment[i].fee
          }

          if(fee_temp==guide_payment[i].fee){
            last_participant_temp = guide_payment[i].participants;
          }

          if(fee_temp!=guide_payment[i].fee && i>0){
            let payment = {key: key,
                           condition: first_participant_temp+" - "+last_participant_temp+" pax",
                           fee: fee_temp};
            data.push(payment);
            key++;
            first_participant_temp = guide_payment[i].participants;
            fee_temp = guide_payment[i].fee;
          }
        }

        data.push({key:key, condition: "More than "+guide_payment[guide_payment.length-1].participants+" pax", fee: guide_payment[guide_payment.length-1].fee});

        return data
  }else
  return []
}



class EachTourCostModel extends Component {

  constructor(props){
    super(props)
    this.state = {
      tour_id: this.props.tourId,
      tour_data: [],
      guide_payment:[]

    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  getTourData(){
    console.log(this.state.tour_id)
    apiAccess({
      url: 'tours/'+this.state.tour_id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_FAILED' })
    })
  }

  componentWillMount(){
    this.getTourData()
    //this.getTourCostModelData()
  }

  componentWillReceiveProps(nextProps){

    if(this.props.specific_tours_data !== nextProps.specific_tours_data){
      if(nextProps.specific_tours_data){
        this.setState({tour_data:nextProps.specific_tours_data})
        this.setState({guide_payment:createCostModelTable(nextProps.specific_tours_data.guide_payment)})
      }
    }

    if(this.props.postGuidePaymentEachTourStatus !== nextProps.postGuidePaymentEachTourStatus){
      if(nextProps.postGuidePaymentEachTourStatus){
        this.getTourData()
      }
  }
}


  render() {

    const columns = [{ title: 'Condition', dataIndex: 'condition'},
                    { title: 'Guide Cost', dataIndex: 'fee'}]

    return (

      <div className = "cost-model-content" style = {{marginTop: '2%'}}>
          <Table columns={columns} dataSource={this.state.guide_payment} size="small" pagination ={false} />
      </div>

    );
  }
}



function mapStateToProps(state){
  return{
    tour_cur_id: state.tourAction.tour_cur_id,
    postGuidePaymentEachTourStatus: state.postGuidePaymentEachTour.postGuidePaymentEachTourStatus,
    specific_tours_data: state.getSpecificTourData.specific_tours_data
  }
}

export default connect(mapStateToProps)(EachTourCostModel)
