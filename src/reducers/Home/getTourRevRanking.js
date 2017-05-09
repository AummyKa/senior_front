
const INITIAL_STATE = {
  revTourRanking: []
}
// { type: 'LOGIN_SUCCESS', text }
const getTourRevRanking = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_ALL_TOUR_REV_RANKING_ATTEMPT':
      return {

      }
    case 'GET_ALL_TOUR_REV_RANKING_SUCCESS':
      return {
        revTourRanking: action.json
      }
    case 'GET_ALL_TOUR_REV_RANKING_FAILED':

      return {

      }

      default:
        return state
}
}

export default getTourRevRanking
