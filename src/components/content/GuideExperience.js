import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker, Table, Icon } from 'antd';

// import StarRating from 'react-star-rating';
import {connect} from 'react-redux';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';

//import apiAccess from '../../Helpers/apiAccess'

const { MonthPicker, RangePicker } = DatePicker;
const monthFormat = 'YYYY-MM';



const data = [{
  key: '1',
  date: '2016-02-04',
  start: '20:30',
  end: '23:30',
  hours: '3',
  type: 'Public',
  tourname: 'Eat at night',
  tourist: '12/12'
}, {
  key: '2',
  date: '2016-02-04',
  start: '20:30',
  end: '23:30',
  hours: '3',
  type: 'Private',
  tourname: 'Eat at night',
  tourist: '12/12'
}, {
  key: '3',
  date: '2016-02-04',
  start: '20:30',
  end: '23:30',
  hours: '3',
  type: 'Public',
  tourname: 'Eat at night',
  tourist: '12/12'
}];

const expertData = [{
  key: '1',
  tourname: "Offbeat Floating Markets Food Tour",
  numberOfTours: 3,
  rating:4
}, {
  key: '2',
  tourname: "Historic Bangrak Food Tasting and Culture Tour",
  numberOfTours: 5,
  rating: 3
}, {
  key: '3',
  tourname: "Eating Adventure at Chatuchak Market",
  numberOfTours: 11,
  rating: 5
}];

class GuideExperience extends Component {

  constructor(props){
    super(props)
    this.state = {
      startdate: "2010-03-01",
      startMonthInput: "2000-02",
      endMonthInput:"2000-03",
      amount_of_workTours: "200",
      filterDropdownVisible: false,
      data,
      searchText: '',
      filtered: false,
      searchInput: ""
    }
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
        columnKey: 'rating',
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
      data: expertData.map((record) => {
        const match = record.tourname.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.tourname.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }


  render() {

  let { sortedInfo, filteredInfo } = this.state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const expertColumns = [{
      title: 'Tourname',
      dataIndex: 'tourname',
      key: 'tourname',
      width: 350,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input.Search
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible })
    },
    {
      title: 'Number of tours',
      dataIndex: 'numberOfTours',
      key: 'numberOfTours',
      width: 70
      },
    {
      title: 'Rating', dataIndex: 'rating', key: 'x', width: 300,
      sorter: (a, b) => a.rating - b.rating,
      sortOrder: sortedInfo.columnKey === 'rating' && sortedInfo.order,
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
      }]

    const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Start',
      dataIndex: 'start'
    }, {
      title: 'End',
      dataIndex: 'end',
    }, {
      title: 'Total Hours',
      dataIndex: 'hours',
    },
     {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        { text: 'Public', value: 'Public' },
        { text: 'Private', value: 'Private' }
      ],
      filteredValue: filteredInfo.type|| null,
      onFilter: (value, record) => record.type.includes(value)
    }, {
        title: 'Tour name',
        dataIndex: 'tourname',
        key: 'tourname',
        filteredValue: filteredInfo.tourname|| null,
        onFilter: (value, record) => record.tourname.includes(value),
        sorter: (a, b) => a.tourname.length - b.tourname.length,
        sortOrder: sortedInfo.columnKey === 'tourname' && sortedInfo.order,
      },
    {
      title: 'Tourists',
      dataIndex: 'tourist'
    }
    ];

    return (
      <div className = "guide-content" >
        <Row>
           <Col span={12}>
           <ul>
            <li>StartDate</li><br/>
            <li>Amount of working tours</li><br/>

          </ul>
           </Col>

           <Col span={12}>
             <ul>
              <li>{this.state.startdate}</li><br/>
              <li>{this.state.amount_of_workTours}  tours</li><br/>
            </ul>
           </Col>
        </Row>

        <div className = "tour-table">
          <h4>List of responsible tour</h4>
          <div className="table-operations" style = {{marginButtom: 10}}>
            <Button onClick={this.sortRateUp}>Rating Max to Min</Button>
            <Button onClick={this.clearSort}>Clear all sorting</Button>
          </div>
          <Table columns={expertColumns} dataSource={expertData}  size="middle" />
        </div>

        <div className = "guide-tourlist">
            <h4>List of responsible tour Start {<MonthPicker style={{ width: 80 }} size={"default"}
            defaultValue ={moment(this.state.startMonthInput, monthFormat)} onChange={this.startDateInput.bind(this)} />}
            End {<MonthPicker style={{ width: 80 }} size={"default"}
            defaultValue ={moment(this.state.endMonthInput, monthFormat)} onChange={this.endDateInput.bind(this)}/>}
            </h4>
           <Table columns={columns} dataSource={data} size="middle" />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {

    return {

      }
}


export default connect(mapStateToProps)(GuideExperience)
