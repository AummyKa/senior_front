
const INITIAL_STATE = {
  bookerAndTourDetail: []
}
// { type: 'LOGIN_SUCCESS', text }
const getBookerAndTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_BOOKER_AND_TOUR_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_BOOKER_AND_TOUR_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
      console.log(action.json)
        return {
          bookerAndTourDetail: action.json
        }

    case 'GET_BOOKER_AND_TOUR_FAILURE':
            console.log("noooooo it's not work")
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getBookerAndTour
