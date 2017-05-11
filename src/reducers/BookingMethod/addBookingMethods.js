

const INITIAL_STATE = {
  addBookingMethodStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const addBookingMethods = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_NEW_BOOKING_METHOD_ATTEMPT':
      return {

      }

    case 'ADD_NEW_BOOKING_METHOD_SUCCESS':
      console.log(action)
      console.log("success")
        return{
          addBookingMethodStatus: true
        }

    case 'ADD_NEW_BOOKING_METHOD_FAILED':
      console.log("fail")
        return{
          addBookingMethodStatus: false
        }

    default:
      return state
    }
}

export default addBookingMethods
