
const INITIAL_STATE = {
  eachTourYearlyRevenueTable: []
}
// { type: 'LOGIN_SUCCESS', text }
const getEachTourYearlyRevenueTable = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_EACH_TOUR_YEARLY_REVENUE_TABLE_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_EACH_TOUR_YEARLY_REVENUE_TABLE_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
        return {
          eachTourYearlyRevenueTable: action.json
        }

    case 'GET_EACH_TOUR_YEARLY_REVENUE_TABLE_FAILURE':
            console.log("noooooo it's not work")
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getEachTourYearlyRevenueTable
