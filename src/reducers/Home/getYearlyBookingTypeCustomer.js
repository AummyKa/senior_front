
const INITIAL_STATE = {
  totalYearlyBookingTypeCustomer: []
}
// { type: 'LOGIN_SUCCESS', text }
const getYearlyBookingTypeCustomer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
          totalYearlyBookingTypeCustomer: action.json
        }
    case 'GET_YEARLY_TOTAL_BOOKINGTYPE_CUSTOMER_FAILURE':
      return {
          totalYearlyBookingTypCustomer: []
      }

    default:
      return state
  }
}

export default getYearlyBookingTypeCustomer
