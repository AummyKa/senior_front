
const INITIAL_STATE = {
  delete_status: false
}
// { type: 'LOGIN_SUCCESS', text }
const deletedTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'DELETE_BOOKER_AND_TOUR_ATTEMPT':
    console.log("deleting")
      return {

      }
    case 'DELETE_BOOKER_AND_TOUR_SUCCESS':
      console.log("delete successful")
      return {
        delete_status: true
      }
    case 'DELETE_BOOKER_AND_TOUR_FAILED':
      console.log("fail deleting")
      return {
        delete_status: false
      }
      default:
        return state

}
}

export default deletedTour
