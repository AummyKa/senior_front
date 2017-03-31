
const INITIAL_STATE = {
  eachTour :[],
  eachTourState: false
}
// { type: 'LOGIN_SUCCESS', text }
const editSpecificTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_SPECIFIC_TOUR_ATTEMPT':
      return {

      }
    case 'GET_SPECIFIC_TOUR_SUCCESS':
      console.log(action)
      return {
        eachTour : action.json,
        eachTourState: true
      }
    case 'GET_SPECIFIC_TOUR_FAILED':

      return {

      }
      default:
        return state

}
}

export default editSpecificTour
