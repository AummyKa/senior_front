import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker, Table, Icon, Popconfirm } from 'antd';
// import StarRating from 'react-star-rating';
import {connect} from 'react-redux';
import moment from 'moment';
import Cookies from 'js-cookie'

import { Modal } from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

import apiAccess from '../../Helpers/apiAccess'
import AddGuideTourRatingModal from '../AddGuideTourRatingModal'

const { MonthPicker, RangePicker } = DatePicker;
const monthFormat = 'YYYY-MM';



class GuideExperience extends Component {

  constructor(props){
    super(props)
    this.state = {
      startdate: "2010-03-01",
      startMonthInput: "2000-02",
      endMonthInput:"2000-03",
      amount_of_workTours: "200",
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      searchInput: "",
      guideProfile: [],
      guideProfileExpert: [],
      guideRatingData: [],
      favEditable: false,
      favSelected: 0,
      showAddRatingModal: false,
      newExpertRating: 0,
      starFavColor:"#FDDC02"
    }
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
        this.setState({guideProfileExpert: this.createGuideRatingData(nextProps.curGuideProfile.expert)})
        // this.setState({guideRatingData: this.createGuideRatingData(nextProps.curGuideProfile)})
      }
    }
    if(this.props.updateStaffStatus !== nextProps.updateStaffStatus){
      if(nextProps.updateStaffStatus){
        this.eachGuide(Cookies.get('guide_id'))
        this.setState({starFavColor:"#FDDC02"})
      }
    }
    console.log(nextProps.addGuideExpertStatus)
    if(this.props.addGuideExpertStatus !== nextProps.addGuideExpertStatus){
      if(nextProps.addGuideExpertStatus){
        this.setState({showAddRatingModal: false})
        this.eachGuide(Cookies.get('guide_id'))
      }
    }

    if(this.props.deleteEachGuideExpertStatus !== nextProps.deleteEachGuideExpertStatus){
      if(nextProps.deleteEachGuideExpertStatus){
        this.eachGuide(Cookies.get('guide_id'))
      }
    }

    if(this.props.updateEachGuideExpertStatus !== nextProps.updateEachGuideExpertStatus){
      if(nextProps.updateEachGuideExpertStatus){
        this.eachGuide(Cookies.get('guide_id'))
      }
    }

  }

  eachGuide(id){
      apiAccess({
       url: 'http://localhost:8000/staffs/'+id,
       method: 'GET',
       payload: null,
       attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_ATTEMPT' }),
       successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_SUCCESS', json }),
       failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_FAILED' })
     })
  }


  createGuideRatingData(arrayJSON){
    let resultJSON = []

    if(arrayJSON!=null){
      for(var i = 0; i < arrayJSON.length; i++) {

        var objectJSON = {
          key: i,
          tour: arrayJSON[i].tour,
          rate: arrayJSON[i].rate,
          editable: false,
          starColor:"#FDDC02"
        }

        resultJSON[i] = objectJSON
    }
  }
    console.log(resultJSON)
    return resultJSON
  }

  startDateInput(date,dateString){
    this.setState({startMonthInput : dateString})
  }

  endDateInput(date,dateString){
    this.setState({endMonthInput : dateString})
  }

  handleRateChange = (value) => {
    this.setState({rateValue: value });
  }

  sortRateUp = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'rate',
      },
    });
  }

  clearSort = () => {
    this.setState({
      sortedInfo: null,
    });
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSearch = (value) => {
    console.log(value)
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.state.guideRatingData.map((record) => {
        const match = record.tour.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.tour.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }

  countingFavStar(nextValue, prevValue, name){
    this.setState({favSelected:nextValue})
  }

  editfavorable(){
    this.setState({favEditable:true})
    this.setState({starFavColor:"#F92525"})
  }

  savefavorable(){
    this.setState({favEditable:false})


    let id = Cookies.get('guide_id')
    let favSelected = this.state.favSelected


    let payload = {
      favorable: favSelected
    }

    apiAccess({
      url: 'http://localhost:8000/staffs/update-favorable/'+id,
      method: 'POST',
      payload: payload,
      attemptAction: () => this.props.dispatch({ type: 'UPDATE_STAFF_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'UPDATE_STAFF_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'UPDATE_STAFF_FAILED' })
    })

  }

  addTourRating(){
    this.setState({showAddRatingModal:true})
  }

  handleExpertChange(nextValue, prevValue, name){
    if(nextValue){
      console.log(nextValue)
      this.setState({newExpertRating:nextValue})
    }
  }

  editRating(record,index){
    console.log(record)
    console.log(record.key)
    const dataSource = [...this.state.guideProfileExpert];
    console.log(dataSource)
    dataSource[record.key].starColor = "#F92525"
    dataSource[record.key].editable = true

    this.setState({guideProfileExpert: dataSource})
  }

  updateRating(record,index){
    let id = Cookies.get('guide_id')
    console.log(this.state.newExpertRating)
    let newRating = this.state.newExpertRating

    let payload = {
          tour: record.tour,
          rate: newRating
        }

    apiAccess({
      url: 'http://localhost:8000/staffs/update-expert/'+id,
      method: 'POST',
      payload: payload,
      attemptAction: () => this.props.dispatch({ type: 'UPDATE_EXPERT_EACH_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'UPDATE_EXPERT_EACH_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'UPDATE_EXPERT_EACH_GUIDE_FAILED' })
    })
  }

  deleteEachExpert(record){
    let tour = record.tour
    let rate = record.rate
    let id = Cookies.get('guide_id')

    let payload = [{
      tour: tour,
      rate: rate
    }]

    apiAccess({
      url: 'http://localhost:8000/staffs/remove-expert/'+ id,
      method: 'POST',
      payload: payload,
      attemptAction: () => this.props.dispatch({ type: 'DELETE_EACH_GUID_EXPERT_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'DELETE_EACH_GUID_EXPERT_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'DELETE_EACH_GUID_EXPERT_FAILED' })
    })
  }

  render() {

  let { sortedInfo, filteredInfo } = this.state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const expertColumns = [{
      title: 'Tour name',
      dataIndex: 'tour',
      key: 'tour',
      width: 300
      // filterDropdown: (
      //   <div className="custom-filter-dropdown">
      //     <Input.Search
      //       ref={ele => this.searchInput = ele}
      //       placeholder="Search name"
      //       value={this.state.searchText}
      //       onChange={this.onInputChange}
      //       onPressEnter={this.onSearch}
      //     />
      //     <Button type="primary" onClick={this.onSearch}>Search</Button>
      //   </div>
      // ),
      // filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      // filterDropdownVisible: this.state.filterDropdownVisible,
      // onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible })
    },
    {
      title: 'Rating', dataIndex: 'rate', key: 'key', width: 200,
      sorter: (a, b) => a.rate - b.rate,
      sortOrder: sortedInfo.columnKey === 'rate' && sortedInfo.order,
      render: (text, record) =>
      <span>
        <StarRatingComponent
          name= "rating"
          starCount={5}
          value={record.rate}
          onStarClick= {this.handleExpertChange.bind(this)}
          editing={record.editable}
          starColor= {record.starColor}
          emptyStarColor= "#000000"
          renderStarIcon={() => <span><Icon type="star" /></span>}
        />
      </span>
    },
    { title: 'Action', dataIndex: '', key: 'x', width: 180,
      render: (record,index) =>
      <span>
        { record.editable ?
          <Button type="primary" onClick = {() => this.updateRating(record,index)}>Save Rating</Button>
        : <Button type="primary" onClick = {() => this.editRating(record,index)}>Edit Rating</Button>
        }
        <span className="ant-divider" />
          <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
            onConfirm = {() =>  this.deleteEachExpert(record)}>
              <Button type="danger">Delete</Button>
          </Popconfirm>
      </span>

    }]


    let closeRatingModal = () => {this.setState({showAddRatingModal: false})}

    return (

      <div>

      <div className="modal-container" >
          <Modal
            show={this.state.showAddRatingModal}
            onHide={closeRatingModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Add Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddGuideTourRatingModal dispatch = {this.props.dispatch} />
            </Modal.Body>

          </Modal>
        </div>

      <div className = "guide-content" >
        <Row>
           <Col span={12}>
           <ul>
            <li>StartDate</li><br/>
            <li>Amount of working tours</li><br/>
            <li>favorable point</li><br/>

          </ul>
           </Col>

           <Col span={12}>
             <ul>
              <li>{this.state.startdate}</li><br/>
              <li>{this.state.amount_of_workTours}  tours</li><br/>
              <li><span>
                <StarRatingComponent
                  name="favorable"
                  starCount={5}
                  onStarClick = {this.countingFavStar.bind(this)}
                  value={this.state.guideProfile.favorable}
                  editing={this.state.favEditable}
                  starColor= {this.state.starFavColor}
                  emptyStarColor= "#000000"
                  renderStarIcon={() => <span><Icon type="star" /></span>}
                />
              { this.state.favEditable ?
                <Button style = {{marginLeft: 50}} onClick = {()=> this.savefavorable() }>Save!</Button>
              : <Button style = {{marginLeft: 50}} onClick = {()=> this.editfavorable() }>Edit !</Button>
              }
              </span></li><br/>
            </ul>
           </Col>
        </Row>

        <div className = "tour-table">
          <h4>List of responsible tour</h4>
          <div className="table-operations" style = {{marginButtom: 10}}>
            <Button onClick={this.sortRateUp}>Rating Max to Min</Button>
            <Button onClick={this.clearSort}>Clear all sorting</Button>
            <Button style = {{ left: "48.5%" }} type="primary" onClick={this.addTourRating.bind(this)}>Add more Rating</Button>
          </div>
          <Table columns={expertColumns} dataSource={this.state.guideProfileExpert}  size="middle" />
        </div>

      </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      deleteEachGuideExpertStatus: state.deleteEachGuideExpert.deleteEachGuideExpertStatus,
      guide_id: state.guideProfile.guide_id,
      curGuideProfile: state.guideProfile.curGuideProfile,
      updateStaffStatus: state.updateStaff.updateStaffStatus,
      addGuideExpertStatus: state.addGuideExpertField.addGuideExpertStatus,
      updateEachGuideExpertStatus: state.updateEachGuideExpert.updateEachGuideExpertStatus
  }
}


export default connect(mapStateToProps)(GuideExperience)