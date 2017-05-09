

const INITIAL_STATE = {
  bookingMethodLists: false
}

// { type: 'LOGIN_SUCCESS', text }
const getBookingMethods = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_BOOKING_METHODS_ATTEMPT':
      return {

      }

    case 'GET_BOOKING_METHODS_SUCCESS':
      console.log("success")
        return{
          bookingMethodLists: action.json
        }

    case 'GET_BOOKING_METHODS_FAILED':
      console.log("fail")
        return{

        }

    default:
      return state
    }
}

export default getBookingMethods
