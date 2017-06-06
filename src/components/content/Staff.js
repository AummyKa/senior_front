import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Row,Col,Table, Input, Button, Icon } from 'antd';
import apiAccess from '../../Helpers/apiAccess'

import Cookies from "js-cookie"


const StaffUserData = (arrayJSON,resultJSON) =>{

  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {

      var objectJSON = {
        key: i,
        _id: arrayJSON[i]._id,
        fullname: arrayJSON[i].fullname,
        email: arrayJSON[i].email,
        role:arrayJSON[i].role
      }

      resultJSON[i] = objectJSON
  }
}else {
  return resultJSON
}
  //return resultJSON
}

class Staff extends Component{

  constructor(props){
    super(props)
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      value: '',
      data: [],
      searchText:'',
      filterDropdownVisible: false
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters() {
    this.setState({ filteredInfo: null });
  }

  clearAll() {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  getStaffs(){
    apiAccess({
      url: 'staffs/non-tour-guides',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_STAFF_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_STAFF_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_STAFF_FAILED' })
    })
  }

  componentWillMount(){
    this.getStaffs()
  }

  componentWillReceiveProps(nextProps){

    if(this.props.staffLists !== nextProps.staffLists){
        StaffUserData(nextProps.staffLists,this.state.data)
    }
  }

  eachStaff(event, index){
    console.log(event._id)
    let id = event._id
    Cookies.set('staff_id',event._id)
    this.context.router.push('/staff/'+id);
  }


  onInputChange = (e) => {
     this.setState({ searchText: e.target.value });
   }

  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.state.data.map((record) => {
        const match = record.fullname.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.fullname.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }

  onReset = () =>{
    this.setState({
      filterDropdownVisible: false
    })
    this.getStaffs()
  }


  render() {

    //table
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [{
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input style = {{width:'80%'}}
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" icon="search"  onClick={this.onSearch} />
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()),

      sorter: (a, b) => a.fullname.length - b.fullname.length

    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',

      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => record.email.includes(value),
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Customer Service', value: 'Customer Service' },
        { text: 'Operation', value: 'Operation' },
        { text: 'Finance', value: 'Finance' }
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.role.indexOf(value) === 0,
      sorter: (a, b) => a.role.length - b.role.length,
    }];

    return (
      <div className="staff-list-content">
      <div className = "topic">
        <h2>Staffs</h2>
      </div>

      <div className = "guide-filter">
        <Button onClick={this.onReset}>Search Reset</Button>
      </div>

      <div className = "guide-container">
        <div className="table-operations">
        </div>
        <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange}
          onRowClick = {this.eachStaff.bind(this)}
           />
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {

    return {
        staffLists: state.getStaffLists.staffLists
    };
}

export default connect(mapStateToProps)(Staff)
