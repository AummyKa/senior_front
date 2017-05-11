import React, { Component } from 'react';
import PropTypes from 'prop-types'


import { Button, Col, Row, Table} from 'antd';
import { Modal } from 'react-bootstrap';


import {connect} from 'react-redux';


const data = [{
  key: '1',
  amt_of_customer: '1-2 pax',
  price: 600,
}, {
  key: '2',
  amt_of_customer: '3-4 pax',
  price: 700,
}, {
  key: '3',
  amt_of_customer: '5-8 pax',
  price: 800,
},{
  key: '4',
  amt_of_customer: '9-12 pax',
  price: 900,
}, {
  key: '5',
  amt_of_customer: '13-16 pax',
  price: 100,
}, {
  key: '6',
  amt_of_customer: 'More than 16',
  price: 1200,
}];


class EachTourCostModel extends Component {

  constructor(props){
    super(props)
    this.state = {
      tour_data: []
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  getTourCostModelData(){
    // let id = Cookies.get('tour_id')
    // apiAccess({
    //   url: 'http://localhost:8000/tours/'+id,
    //   method: 'GET',
    //   payload: null,
    //   attemptAction: () => this.props.dispatch({ type: 'GET_TOUR_DATA_ATTEMPT' }),
    //   successAction: (json) => this.props.dispatch({ type: 'GET_TOUR_DATA_SUCCESS', json }),
    //   failureAction: () => this.props.dispatch({ type: 'GET_TOUR_DATA_FAILED' })
    // })
  }

  componentWillMount(){
    //this.getTourData()
  }

  componentWillReceiveProps(nextProps){
    // if(this.props.tour_data !== nextProps.tour_data){
    //   this.setState({tour_data:nextProps.tour_data})
    //   console.log(nextProps.tour_data)
    // }
  }


  render() {

    const columns = [{ title: 'Amount of Customer', dataIndex: 'amt_of_customer'},
                    { title: 'Guide Cost', dataIndex: 'price'}]

    return (

      <div className = "cost-model-content" style = {{marginTop: '2%'}}>
          <Table columns={columns} dataSource={data} size="small" pagination ={false} />
      </div>

    );
  }
}



function mapStateToProps(state){
  return{
    tour_cur_id: state.tourAction.tour_cur_id,
    tour_data: state.getTourData.tour_data
  }
}

export default connect(mapStateToProps)(EachTourCostModel)
