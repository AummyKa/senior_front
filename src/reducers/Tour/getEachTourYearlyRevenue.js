
const INITIAL_STATE = {
  eachTourYearlyRevenue: []
}
// { type: 'LOGIN_SUCCESS', text }
const getEachTourYearlyRevenue = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_EACH_TOUR_YEARLY_REVENUE_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_EACH_TOUR_YEARLY_REVENUE_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
        return {
          eachTourYearlyRevenue: action.json
        }

    case 'GET_EACH_TOUR_YEARLY_REVENUE_FAILURE':
            console.log("noooooo it's not work")
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getEachTourYearlyRevenue
