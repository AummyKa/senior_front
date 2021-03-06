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
      url: 'bookedtours/total-participants/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_CUSTOMER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_CUSTOMER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_CUSTOMER_FAILURE' })
    })
  }

  getYearlyBookingTypeCustomer(year){
    apiAccess({
      url: 'bookedtours/total-participants/bookingmethod-type/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_FAILURE' })
    })
  }

  getYearlyTourTypeCustomer(year){
    apiAccess({
      url: 'bookedtours/total-participants/tour-type/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_FAILURE' })
    })
  }

  getMostPopularTour(year){
    apiAccess({
      url: 'bookedtours/most-popular-tour/participants/'+year,
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
    let tourname = 'N/A'
    let amt_customer = 0

      if(typeof data[0] !== 'undefined' && typeof data[0].tour_name){
        tourname = data[0].tour_name
      }

      if(typeof data[0] !== 'undefined' && typeof data[0].participants){
        amt_customer = data[0].participants
      }


    let result = tourname+ ': '+amt_customer+ ' customers'
    this.setState({mostYearlyPopularTour:result})
  }

  checkTourTypeCustomer(data){
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
        this.getMostPopularTour(nextProps.selectedYear)
        this.getYearlyTourTypeCustomer(nextProps.selectedYear)
        this.getYearlyBookingTypeCustomer(nextProps.selectedYear)
        this.getYearlyTotalCustomer(nextProps.selectedYear)

      }
    }

    if(this.props.totalYearlyCustomer !== nextProps.totalYearlyCustomer){
      if(nextProps.totalYearlyCustomer){
        if(typeof nextProps.totalYearlyCustomer[0] !=='undefined'
        && typeof nextProps.totalYearlyCustomer[0].participants ){
          let totalCustomers = nextProps.totalYearlyCustomer[0].participants
          this.setState({netCustomers: totalCustomers})
        }
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

      <div className="customer-box-above" style={{backgroundColor:'#9B2F10'}}>
         <Row gutter={8}>
           <Col xs={24} lg={4} >
             <div className="total-customer" >
               <h3>Total customers</h3>
               <p>{this.state.netCustomers}</p>
             </div>
           </Col>
           <Col xs={12} lg={5}>
             <div className="individual-customer" >
               <h4>Direct Customer</h4>
               <p>{this.state.individualCustomers}</p>
             </div>

             <div className="agency-customer">
               <h4>Agency</h4>
               <p>{this.state.agencyCustomer}</p>
             </div>
           </Col>
           <Col xs={12} lg={5}>
             <div className="public-tour" >
               <h4>Public Tour</h4>
               <p>{this.state.publicCustomers}</p>
             </div>
             <div className="private-tour">
               <h4>Private Tour</h4>
               <p>{this.state.privateCustomers}</p>
             </div>
           </Col>

           <Col xs={24} lg={10}>
             <div className="popular-tour" >
               <h3>Most Popular Tour</h3>
               <p>{this.state.mostYearlyPopularTour}</p>
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
