
const INITIAL_STATE = {
  showAddCustomer: false,
  addTourID: ''
}
// { type: 'LOGIN_SUCCESS', text }
const addCustomerModal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_ADD_CUSTOMER':
      return {
          addTourID: action.tourID,
          showAddCustomer: true
        //loading sign
      }
    case 'CLOSE_ADD_CUSTOMER':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
            showAddCustomer: false
        }

    default:
      return state
  }
}

export default addCustomerModal
