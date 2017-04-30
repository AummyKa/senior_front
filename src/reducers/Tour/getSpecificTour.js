
const INITIAL_STATE = {
  eachTour :[],
  eachTourState: false,
  curTourID: ""
}
// { type: 'LOGIN_SUCCESS', text }
const editSpecificTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_SPECIFIC_TOUR_ATTEMPT':
      return {

      }
    case 'GET_SPECIFIC_TOUR_SUCCESS':
      console.log(action)
      console.log(action.json._id)
      return {
        curTourID: action.json._id,
        eachTour : action.json,
        eachTourState: true
      }
    case 'GET_SPECIFIC_TOUR_FAILED':

      return {

      }

    case 'FINISH_GET_SPECIFIC_TOUR':
      console.log("finish get tour")
      return {
          eachTourState: false
      }

      default:
        return state

}
}

export default editSpecificTour
