
const INITIAL_STATE = {
  showEditCustomer: false,
  customerData: [],
  showDeleteCustomerModal: false,
  cur_cus_email:''
}
// { type: 'LOGIN_SUCCESS', text }
const editCustomerModal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_EDIT_CUSTOMER':
      console.log(action.customerData)
      return {
          customerData: action.customerData,
          showEditCustomer: true
        //loading sign
      }
    case 'CLOSE_EDIT_CUSTOMER':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
            showEditCustomer: false
        }
    case 'FINISH_EDIT_CUSTOMER':
      return {
        //pop up
      }

    case 'SHOW_DELETE_CUSTOMER_MODAL':

        return {
            showDeleteCustomerModal:true,
            cur_cus_email:action.email
        }
        
    case 'CLOSE_DELETE_CUSTOMER_MODAL':
        return {
            showDeleteCustomerModal:false
        }



    default:
      return state
  }
}

export default editCustomerModal
