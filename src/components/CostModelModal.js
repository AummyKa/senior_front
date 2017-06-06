import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, InputNumber, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;
let title1 = "Amount of Participants"
let title2 = "Tour Guide Cost(Baht)"

function participantsAndFee(firstNum,secNum,guide_cost){
    let result = []
    for(let i =firstNum;i<=secNum;i++){
      var sub ={
        participants: i,
        fee: guide_cost
      }
      result[i] = sub
    }
    return result
}

function createArray(len){
  console.log(len)
  if(len>1){
    let arr = []
    for(let i=1;i<=len-1;i++){
      arr[i]=i
    }
    return arr
  }else {
    return [1]
  }


}
//
// function getHistoryGuidePaymentCondition(guide_payment){
//
//         let data = [];
//         let first_participant_temp, last_participant_temp, fee_temp;
//
//         for(var i=0; i < guide_payment.length; i++){
//
//           if(i==0){
//               first_participant_temp = guide_payment[i].participants
//               fee_temp = guide_payment[i].fee
//           }
//
//           if(fee_temp == guide_payment[i].fee){
//             last_participant_temp = guide_payment[i].participants
//           }
//
//           if(fee_temp!=guide_payment[i].fee && i>0){
//             if(first_participant_temp>last_participant_temp){
//               last_participant_temp = first_participant_temp;
//             }
//             let payment = {first: first_participant_temp,
//                            second: last_participant_temp,
//                            fee: fee_temp};
//             data.push(payment);
//             first_participant_temp = guide_payment[i].participants
//             fee_temp = guide_payment[i].fee
//           }
//         }
//
//         if(guide_payment.length>1){
//           if(guide_payment[guide_payment.length-1].fee==guide_payment[guide_payment.length-2].fee){
//             let payment = {first: first_participant_temp,
//                            second: last_participant_temp-1,
//                            fee: fee_temp};
//             data.push(payment)
//             data.push({last: last_participant_temp, fee: fee_temp})
//           }else{
//             let lastParticipant = guide_payment[guide_payment.length-1].participants
//             let lastFee = guide_payment[guide_payment.length-1].fee
//             data.push({last:lastParticipant, fee: lastFee})
//           }
//         }
//
//         return data
// }


class CostModelModal extends Component{

  constructor(props){
    super(props)
    this.state = {
      tour_id: this.props.tourId,
      paymentConditionHistory:[],
      last_fee:"",
      dataArray: [1,2,3,4,5]
    }
  }

  componentWillMount(){
    this.getTourData()
  }

  componentWillReceiveProps(nextProps){

    // if(this.props.specific_tours_data !== nextProps.specific_tours_data){
    //   if(typeof nextProps.specific_tours_data !== 'undefined' && nextProps.specific_tours_data !==null){
    //     console.log(nextProps.specific_tours_data)
    //     if(typeof getHistoryGuidePaymentCondition(nextProps.specific_tours_dataguide_payment !== 'undefined'
    //       && getHistoryGuidePaymentCondition(nextProps.specific_tours_data !== null))){
    //       let len = getHistoryGuidePaymentCondition(nextProps.specific_tours_data.guide_payment).length
    //
    //       this.setState({dataArray:createArray(len)})
    //       this.setState({last_fee:getHistoryGuidePaymentCondition(nextProps.specific_tours_data.guide_payment)
    //         [len-1].fee})
    //       this.setState({paymentConditionHistory:getHistoryGuidePaymentCondition(nextProps.specific_tours_data.guide_payment)})
    //     }
    //   }
    // }
  }

  getTourData(){
    apiAccess({
      url: 'tours/'+this.state.tour_id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_SPECIFIC_TOUR_DATA_FAILED' })
    })
  }

  handleSubmit(e) {

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {

        const count = this.props.form.getFieldValue('keys').length
        console.log(count)

        let formResult = []
        for(var i = 1; i <= count; i++){
            let firstNum = this.props.form.getFieldValue(`firstNumber-${i}`)
            let secNum = this.props.form.getFieldValue(`secondNumber-${i}`)
            let guide_cost = this.props.form.getFieldValue(`guide-cost-${i}`)

            let result = participantsAndFee(firstNum,secNum,guide_cost)
            formResult.push(result)
        }

        let lastNum = this.props.form.getFieldValue(`lastNumber`)
        let lastPrice = this.props.form.getFieldValue(`lastPrice`)

        var arr = {
          participants: lastNum,
          fee: lastPrice
        }

        formResult.push(arr)

        //flattened array
        var flattened = formResult.reduce(function(a, b) {
          return a.concat(b);
        });

        //remove undefined values from array
        var guide_payment = flattened.filter(function( element ) {
           return element !== undefined;
        });

          apiAccess({
            url: 'tours/update-guide-payment/'+this.state.tour_id,
            method: 'POST',
            payload:{ guide_payment },
            attemptAction: () => this.props.dispatch({ type: 'POST_GUIDE_PAYMENT_EACH_TOUR_ATTEMPT' }),
            successAction: (json) => this.props.dispatch({ type: 'POST_GUIDE_PAYMENT_EACH_TOUR_SUCCESS', json }),
            failureAction: () => this.props.dispatch({ type: 'POST_GUIDE_PAYMENT_EACH_TOUR_FAILED' })
          })

        }else
            console.log("error")
      });
  }

  editCondition(){

  }

  editInputStatus(fieldname){

  }



  add(){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let num = keys.slice(-1)[0]
    num++
    const nextKeys = keys.concat(num);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== keys.slice(-1).pop()),
    });
 }

checkFirstValue(prevValue,number){
  if(typeof prevValue !== 'undefined' && typeof number !== 'undefined'){
    if(typeof this.state.paymentConditionHistory ==='undefined' ||
    typeof this.state.paymentConditionHistory[number -1] === 'undefined' ||
    typeof this.state.paymentConditionHistory[number -1].first === 'undefined'
    ){
      return ''
    }else if(prevValue){
      prevValue++
    }else
      return this.state.paymentConditionHistory[number-1].first
    }
}


checkSecondValue(number){
  // if(typeof number !== 'undefined' && typeof this.state.paymentConditionHistory !=='undefined' ){
  //   if(typeof this.state.paymentConditionHistory[number -1] !== 'undefined' &&
  //   typeof this.state.paymentConditionHistory[number -1].second !== 'undefined'
  //   ){
  //     return this.state.paymentConditionHistory[number-1].second
  //   }else {
  //     return ''
  //   }
  // }else {
  //   return ''
  // }
}

checkCostValue(number){
  // if(typeof number !== 'undefined'){
  //   if(typeof this.state.paymentConditionHistory !=='undefined' &&
  //   typeof this.state.paymentConditionHistory[number -1] !== 'undefined' &&
  //   typeof this.state.paymentConditionHistory[number -1].fee !== 'undefined'
  //   ){
  //     return this.state.paymentConditionHistory[number-1].fee
  //   }else {
  //     return 0
  //   }
  // }else
  //   return 0
}

getNextValue(preValue){

  if(typeof preValue !== 'undefined' && preValue !== ''){
    console.log(preValue)
    return preValue+1
  }
  // if(typeof this.state.paymentConditionHistory !=='undefined' &&
  // typeof this.state.paymentConditionHistory[this.state.paymentConditionHistory.length-1] !== 'undefined' &&
  // typeof this.state.paymentConditionHistory[this.state.paymentConditionHistory.length -1].last !== 'undefined'
  // ){
  //   return this.state.paymentConditionHistory[this.state.paymentConditionHistory.length -1].last
  // }else if(preValue){
  //   return preValue+1
  // }else
  //  return ''
}

checkLastCost(){
  if(typeof this.state.last_fee !== 'undefined'){
    return this.state.last_fee
  }else
    return ''
  // if(typeof this.state.paymentConditionHistory !=='undefined' &&
  // typeof this.state.paymentConditionHistory[this.state.paymentConditionHistory.lenght-1] !== 'undefined' &&
  // typeof this.state.paymentConditionHistory[this.state.paymentConditionHistory.length -1].fee !== 'undefined'
  // ){
  //   return this.state.paymentConditionHistory[this.state.paymentConditionHistory.length -1].fee
  // }else {
  //   return ''
  // }
}

// checkDuplicateNumber(rule, value, callback){
//   console.log(rule)
//   const form = this.props.form;
//   console.log(form.getFieldValue(`firstNumber-`+rule))
//   if(value == form.getFieldValue(`firstNumber-`+rule)){
//     callback('The numbers should not be the same!');
//   }else {
//     callback();
//   }
// }


  render() {

    const { getFieldDecorator, getFieldValue  } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 12, offset: 1},
      wrapperCol: { span: 10, offset: 1 },
    };
    const feeLayout = {
      labelCol: { span: 12, offset: 1},
      wrapperCol: { span: 14, offset: 1 },
    }
    const lastformItemLayout = {
      labelCol: { span: 14 },
      wrapperCol: { span: 9 },
    };
    const formItemLayoutWithOutLabel = {
       wrapperCol: { span: 13, offset: 11 },
     };

   const formItemLayoutWithOutLabelPlus = {
      wrapperCol: { span: 13, offset: 9 },
    };


   getFieldDecorator('keys', { initialValue: this.state.dataArray });
   const keys = getFieldValue('keys');


    this.state.formItems = keys.map((k, index) => {
      let title = `Condition-${k}`
      return (
        <div>
          <div className = "cost-model-input-form-item" key={k}>
            <Row>
             <Col span={22}>
                  <Row>
                    <Col span={8}>
                      <FormItem
                       {...formItemLayout}
                       label= {title}
                       hasFeedback
                     >
                      {getFieldDecorator(`firstNumber-${k}`
                        ,{initialValue:this.getNextValue(getFieldValue(`secondNumber-${k-1}`))
                        }, {
                        rules: [{
                          required: true }]
                        })(
                      <InputNumber className = "firstNumber"  style={{width: '95%'}}/>
                      )}
                    </FormItem>
                    </Col>
                    <Col span={1}>
                      <p className="ant-form-split" style = {{textAlign: "center"}}>-</p>
                    </Col>
                    <Col span={7}>
                      <FormItem
                       {...formItemLayout}
                       hasFeedback
                     >
                      {getFieldDecorator(`secondNumber-${k}`,{initialValue: '' }, {
                        rules: [{
                          required: true }]
                        })(
                      <InputNumber className = "secondNumber" style={{width: '100%'}}  />
                      )}
                    </FormItem>
                    </Col>
                    <Col span={6}>
                      <FormItem
                       {...feeLayout}
                       hasFeedback
                     >
                      {getFieldDecorator(`guide-cost-${k}`,{initialValue: ''}, {
                        rules: [{
                          required: true }]
                        })(
                      <InputNumber className = "guide-cost" min={1} max={100000} />
                      )}
                    </FormItem>
                    </Col>
                  </Row>
             </Col>

             <Col span={1}>
               <Icon
                 className="dynamic-delete-button"
                 type="minus-circle-o"
                 disabled={keys.length === 1}
                 onClick={() => this.remove()}
               />
            </Col>
          </Row>

      </div>
     </div>
    )
  })

    return(
      <Form className = "cost-model-form" onSubmit={this.handleSubmit.bind(this)}>

        <Row style = {{marginBottom: "2%"}}>
          <Col span={8} offset = {2}>
            <h7><b>{title1}</b></h7>
          </Col>
          <Col span={5} offset = {5}>
            <h7><b>{title2}</b></h7>
          </Col>
        </Row>

        {this.state.formItems}
        <Row>
         <Col span={22}>

              <Row>
                <Col span={9}>
                  <FormItem
                   {...lastformItemLayout}
                   label= "Last condition"
                   hasFeedback
                 >
                   {getFieldDecorator(`lastNumber`
                   ,{initialValue: this.getNextValue(getFieldValue(`secondNumber-${getFieldValue('keys').length}`))}|| 0
                   , {
                     rules: [{
                       required: true }]
                     })(
                  <InputNumber className = "lastNumber" style={{width: '90%'}}/>
                  )}
                </FormItem>
                </Col>
                <Col span={1}>
                  <p className="ant-form-split" style = {{textAlign: "center"}}>-</p>
                </Col>
                <Col span={2}>
                  <Icon type="ellipsis" style={{fontSize:"26px", marginLeft: '5%'}} />
                </Col>
                <Col span={6} offset={4}>
                  <FormItem
                   {...feeLayout}
                   hasFeedback
                 >
                 {getFieldDecorator(`lastPrice`, {initialValue: this.checkLastCost()}, {
                   rules: [{
                     required: true }]
                   })(
                  <InputNumber className="lastPrice" min={1} max={100000}  />
                  )}
                </FormItem>
                </Col>
              </Row>
         </Col>

         <Col span={1}>
           <Icon
             className="dynamic-delete-button"
             type="minus-circle-o"
             disabled={true}
           />
        </Col>
      </Row>
        <FormItem {...formItemLayoutWithOutLabelPlus}>
          <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
            <Icon type="plus" /> Add More Condition
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large" style = {{marginTop: 20}}>Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

function mapStateToProps(state){
  return{
    specific_tours_data: state.getSpecificTourData.specific_tours_data
  }
}

export default connect(mapStateToProps)(Form.create({})(CostModelModal));
