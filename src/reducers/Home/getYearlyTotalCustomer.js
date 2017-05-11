
const INITIAL_STATE = {
  totalYearlyCustomer: []
}
// { type: 'LOGIN_SUCCESS', text }
const getYearlyTotalCustomer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_YEARLY_TOTAL_CUSTOMER_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_YEARLY_TOTAL_CUSTOMER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
          totalYearlyCustomer: action.json
        }
    case 'GET_YEARLY_TOTAL_CUSTOMER_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getYearlyTotalCustomer
