
const INITIAL_STATE = {
  totalYearlyTourTypeCustomer: []
}
// { type: 'LOGIN_SUCCESS', text }
const getYearlyTourTypeCustomer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
          totalYearlyTourTypeCustomer: action.json
        }
    case 'GET_YEARLY_TOTAL_TOURTYPE_CUSTOMER_FAILURE':
      return {
          totalYearlyTourTypeCustomer: []
      }

    default:
      return state
  }
}

export default getYearlyTourTypeCustomer
