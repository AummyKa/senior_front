
const INITIAL_STATE = {
  totalCustomerTourRanking: []
}
// { type: 'LOGIN_SUCCESS', text }
const getTourCustomerRanking = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_ALL_TOUR_CUSTOMERS_RANKING_ATTEMPT':
      return {

      }
    case 'GET_ALL_TOUR_CUSTOMERS_RANKING_SUCCESS':
      return {
        totalCustomerTourRanking: action.json
      }
    case 'GET_ALL_TOUR_CUSTOMERS_RANKING_FAILED':

      return {
        totalCustomerTourRanking: []
      }

      default:
        return state
}
}

export default getTourCustomerRanking
