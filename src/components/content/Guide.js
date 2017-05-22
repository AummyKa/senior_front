import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { AutoComplete, Row,Col,Table, Input, Button, Icon, Select, Tag } from 'antd';


import apiAccess from '../../Helpers/apiAccess'
import { curGuideID } from '../../actions/action-spreadGuideID'

import Cookies from 'js-cookie'

const Search = Input.Search
const Option = Select.Option;


const GuideUserData = (arrayJSON,resultJSON) =>{
  console.log(arrayJSON)
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {

      var objectJSON = {
        key: i,
        _id: arrayJSON[i]._id,
        fullname: arrayJSON[i].fullname,
        email: arrayJSON[i].email,
        contract: arrayJSON[i].contract,
        isActive: arrayJSON[i].isActive
      }

      resultJSON[i] = objectJSON
  }
}else {
  return resultJSON
}

}

function throwOptionGuideObject(data){
  let temp = []
  if(data){
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
    }

  }
  return temp
}

class Guide extends Component{

  constructor(props) {
    super(props)

    this.state = {
      value: '',
      data: [],
      cur_id: '',
      searchText:'',
      filterDropdownVisible: false
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onChange(pagination, filters, sorter) {
    // console.log('params', pagination, filters, sorter);
  }


  eachGuide(event, index){
    let id = event._id
    Cookies.set('guide_id',id)
    this.context.router.push('/guide/'+id);
  }

  getGuideList(){
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_FAILED' })
    })


  }
  componentWillReceiveProps(nextProps){

    if(this.props.guideLists !== nextProps.guideLists){
      GuideUserData(nextProps.guideLists,this.state.data)
      // this.setState({data: GuideUserData(nextProps.guideDetail,)})
    }
  }

  componentWillMount(){
    this.getGuideList()
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
    this.getGuideList()
  }

  checkActive = (isActive) =>{
    console.log(isActive)
    if(isActive){
      return(
        <Tag color="#0CDB32">Active</Tag>
      )
    }else{
      return(
        <Tag color="#EE1908">InActive</Tag>
      )
    }
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
          {/*<Select
             showSearch
             ref={ele => this.searchInput = ele}
             style={{width: '150px'}}
             value={this.state.searchText}
             placeholder="Search me"
             optionFilterProp="children"
             onChange={this.onInputChange}
             filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
           >
            {throwOptionGuideObject(this.state.data)}
           </Select>
           <Button type="primary" icon="search"  onClick={this.onSearch} />*/}
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
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },
    {
      title: 'Contract',
      dataIndex: 'contract',
      key: 'contract',
      filters: [{
          text: 'Full Time',
          value:'Full Time',
      }, {
        text: 'Part Time',
        value:'Part Time',
      }],
      filterMultiple: false,
      onFilter: (value, record) => record.contract.indexOf(value) === 0,
      sorter: (a, b) => a.contract.length - b.contract.length,
    },{title: 'Status', dataIndex: 'status', key: 'status',   render: (text, record) =>
      <div>{this.checkActive(record.isActive)}</div>
    }]



    return (
      <div className = "guide-info">
      <div className = "topic">
        <h2>Tour Guides</h2>
      </div>

      <div className = "guide-filter">
        <Button onClick={this.onReset}>Search Reset</Button>
      </div>

      <div className = "guide-container">
        <div className="table-operations">
        </div>
        <Table columns={columns}
          dataSource={this.state.data}
          onChange={this.onChange}
          onRowClick = {this.eachGuide.bind(this)}/>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {

    return {
        guideLists: state.guideDetail.guideLists,
    };
}

export default connect(mapStateToProps)(Guide)
