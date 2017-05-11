import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

import apiAccess from '../../Helpers/apiAccess'

let today = new Date();
let curYear = today.getFullYear();

class BoxAbove extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedyear: curYear,
      netCustomers:[],
      individualCustomers:[],
      agencyCustomer:[],
      publicCustomers:[],
      privateCustomers:[],
      mostYearlyPopularTour:''
    }
  }

  getYearlyTotalCustomer(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/total-participants/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_CUSTOMER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_CUSTOMER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_CUSTOMER_FAILURE' })
    })
  }

  getYearlyBookingTypeCustomer(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/total-participants/bookingmethod-type/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_FAILURE' })
    })
  }

  getYearlyTourTypeCustomer(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/total-participants/tour-type/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_FAILURE' })
    })
  }

  getMostPopularTour(year){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/summary/participants/tour-name/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOUR_CUSTOMERS_RANKING_FAILURE' })
    })
  }

  checkBookingTypeCustomer(data){
    for(let i=0;i<data.length;i++){
      if(data[i].booking_method == "Individual"){
        this.setState({individualCustomers:data[i].participants})
      }else if(data[i].booking_method == "Agency"){
        this.setState({agencyCustomer:data[i].participants})
      }
    }
  }

  getYearlyTheMostPopularTour(data){
    console.log(data)
    let tourname = data[0].tour_name
    let amt_customer = data[0].participants
    let result = tourname+ ': '+amt_customer+ ' customers'
    this.setState({mostYearlyPopularTour:result})
  }

  checkTourTypeCustomer(data){
    console.log(data)
    for(let i=0;i<data.length;i++){
      if(data[i].tour_type == "Public"){
        this.setState({publicCustomers:data[i].participants})
      }else if(data[i].tour_type == "Private"){
        this.setState({privateCustomers:data[i].participants})
      }
    }
  }

  componentWillMount(){
    this.getYearlyBookingTypeCustomer(this.state.selectedyear)
    this.getYearlyTotalCustomer(this.state.selectedyear)
    this.getYearlyTourTypeCustomer(this.state.selectedyear)
    this.getMostPopularTour(this.state.selectedyear)
  }


  componentWillReceiveProps(nextProps){

    if(this.props.selectedYear !== nextProps.selectedYear){
      if(nextProps.selectedYear){
        this.setState({selectedYear:nextProps.selectedYear})
      }
    }

    if(this.props.totalYearlyCustomer !== nextProps.totalYearlyCustomer){
      if(nextProps.totalYearlyCustomer){
        let totalCustomers = nextProps.totalYearlyCustomer[0].participants
        this.setState({netCustomers: totalCustomers})
      }
    }

    if(this.props.totalYearlyBookingTypeCustomer !== nextProps.totalYearlyBookingTypeCustomer){
      if(nextProps.totalYearlyBookingTypeCustomer){
        this.checkBookingTypeCustomer(nextProps.totalYearlyBookingTypeCustomer)
      }
    }

    if(this.props.totalYearlyTourTypeCustomer !== nextProps.totalYearlyTourTypeCustomer){
      if(nextProps.totalYearlyTourTypeCustomer){
        this.checkTourTypeCustomer(nextProps.totalYearlyTourTypeCustomer)
      }
    }

    if(this.state.totalCustomerTourRanking !== nextProps.totalCustomerTourRanking){
      if(nextProps.totalCustomerTourRanking){
        this.getYearlyTheMostPopularTour(nextProps.totalCustomerTourRanking)
      }
    }
  }

  render() {

    return (

      <div>
         <Row>
           <Col className="gutter-row" span={4} >
             <div className="total-customer" >
               <h3>Total customers</h3>
               <div className="total-box"><p style = {{fontSize: '50px'}}>{this.state.netCustomers}</p></div>
             </div>
           </Col>
           <Col className="gutter-row" span={5}>
             <div className="individual-customer" >
               <h4>Individual Customer</h4>
               <div className="text-box">{this.state.individualCustomers}</div>
             </div>

             <div className="agency-customer">
               <h4>Agency</h4>
               <div className="text-box">{this.state.agencyCustomer}</div>
             </div>
           </Col>
           <Col className="gutter-row" span={5}>
             <div className="public-tour" >
               <h4>Public Tour</h4>
               <div className="text-box">{this.state.publicCustomers}</div>
             </div>
             <div className="private-tour">
               <h4>Private Tour</h4>
               <div className="text-box">{this.state.privateCustomers}</div>
             </div>
           </Col>

           <Col className="gutter-row" span={10}>
             <div className="popular-tour" >
               <h3>Most Popular Tour</h3>
               <div className="text-box">{this.state.mostYearlyPopularTour}</div>
             </div>
           </Col>

         </Row>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    selectedYear: state.updateYearDashBoard.selectedYear,
    totalYearlyCustomer: state.getYearlyTotalCustomer.totalYearlyCustomer,
    totalYearlyBookingTypeCustomer: state.getYearlyBookingTypeCustomer.totalYearlyBookingTypeCustomer,
    totalYearlyTourTypeCustomer: state.getYearlyTourTypeCustomer.totalYearlyTourTypeCustomer,
    totalCustomerTourRanking: state.getTourCustomerRanking.totalCustomerTourRanking
  }
}

export default connect(mapStateToProps)(BoxAbove)
