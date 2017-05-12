
const INITIAL_STATE = {
  amountNationsOfEachTour: []
}
// { type: 'LOGIN_SUCCESS', text }
const getAmountNationsOfEachTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_AMOUNT_NATIONS_OF_EACH_TOUR_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_AMOUNT_NATIONS_OF_EACH_TOUR_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
        return {
          amountNationsOfEachTour: action.json
        }

    case 'GET_AMOUNT_NATIONS_OF_EACH_TOUR_FAILURE':
            console.log("noooooo it's not work")
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getAmountNationsOfEachTour
