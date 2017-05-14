import React, { Component } from 'react';
import { connect } from 'react-redux'

import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon, Button,Popover, Select } from 'antd'
import { Modal ,ButtonToolbar } from 'react-bootstrap';

import apiAccess from '../Helpers/apiAccess'


const revTableData = (arrayJSON) =>{
  console.log(arrayJSON)
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
}
  return arrayJSON
}


function throwOptionYearObject(){
  let today = new Date();
  let curYear = today.getFullYear();
  let startYear = 2000

  let temp = []
  for (let i = startYear; i <= curYear; i++) {
    temp.push(<Option key= {i}>{i}</Option>);
  }
  return temp
}

const limitNationTable = (arrayJSON) =>{
  let resultJSON = []
  if(arrayJSON!=null){
    if(arrayJSON.length > 5){
      for(var i = 0; i < 5; i++) {
        resultJSON[i] = arrayJSON[i]
      }
      let leftParticipants = 0
      for(var i=5;i<arrayJSON.length;i++){
        leftParticipants = leftParticipants + arrayJSON[i].participants
      }
      resultJSON.push({country:'others',participants:leftParticipants})

    }else{
      for(var i = 0; i < arrayJSON.length; i++) {
        resultJSON[i] = arrayJSON[i]
      }

  }
}
  return resultJSON
}

const createTable = (arrayJSON) =>{
  console.log(arrayJSON)
  if(arrayJSON!=null){
    for(var i = 0; i < arrayJSON.length; i++) {
      arrayJSON[i]["key"] = i;
  }
}
  return arrayJSON
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FB4B4B','#F82B40'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Option = Select.Option;
let today = new Date();
let curYear = today.getFullYear();

class EachTourPopularNation extends Component {

  constructor(props){
    super(props)
    this.state = {
      selected_year: curYear,
      amountNationsOfEachTour:[],
      amountNationsOfEachTourTable:[],
      tour_id: this.props.tourId
    }
  }

  getPopularNation(year){
    apiAccess({
      url: 'http://localhost:8000/tours/'+this.state.tour_id +'/popular-nation/'+year,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_AMOUNT_NATIONS_OF_EACH_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_AMOUNT_NATIONS_OF_EACH_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_AMOUNT_NATIONS_OF_EACH_TOUR_FAILED' })
    })
  }

  componentWillMount(){
    this.getPopularNation(this.state.selected_year)
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.amountNationsOfEachTour)
    if(this.props.amountNationsOfEachTour !== nextProps.amountNationsOfEachTour){
      if(typeof nextProps.amountNationsOfEachTour !== 'undefined' || typeof nextProps.amountNationsOfEachTour !== null){
        this.setState({amountNationsOfEachTour:limitNationTable(nextProps.amountNationsOfEachTour)})
        this.setState({amountNationsOfEachTourTable:createTable(nextProps.amountNationsOfEachTour)})
      }
    }
    if(this.props.selectedTourYear!==nextProps.selectedTourYear){
      if(nextProps.selectedTourYear){
        this.setState({selected_year:nextProps.selectedTourYear})
        this.getPopularNation(nextProps.selectedTourYear)
      }
    }
  }


  render() {

    const columns = [{  title: 'Color',dataIndex: 'color', render: (text, record) =>
                        <div className= "little-box-label" style = {{backgroundColor: COLORS[record.key]}}>
                        </div>
                    },{  title: 'Ranking',dataIndex: 'ranking', render: (text, record) =>
                         <div>{record.key+1}</div>
                    },{ title: 'Country', dataIndex: 'country'},
                    {  title: 'Participants', dataIndex: 'participants'}];

    return (

      <div>
        <div className = "each-tour-popular-nation-container" style ={{paddingTop:'5%'}}>
          <Row>
            <Col span={9}>
              <PieChart width={300} height={170} onMouseEnter={this.onPieEnter}>
                <Pie
                  data={this.state.amountNationsOfEachTour}
                  cx={140}
                  cy={80}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  nameKey={'country'}
                  valueKey={'participants'}
                >

                {
                  this.state.amountNationsOfEachTour.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
                </Pie>
              </PieChart>

              <div className = "other-color-label-below">
                <Col span = {3} offset={5} ><div className = "little-box-label" style = {{backgroundColor: COLORS[COLORS.length-1]}}/></Col>
                <Col span = {10} offset={1} ><div>Other countries</div></Col>
              </div>

            </Col>
            <Col span={12} offset={1}>
              <div className = "pop-nation-table">
                <Table dataSource ={Array.prototype.slice.apply(this.state.amountNationsOfEachTourTable || [])} columns={columns} size='small'/ >
              </div>
            </Col>
          </Row>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return{
    amountNationsOfEachTour: state.getAmountNationsOfEachTour.amountNationsOfEachTour,
    selectedTourYear: state.updateYearDashBoard.selectedTourYear
  }
}

export default connect(mapStateToProps)(EachTourPopularNation)
