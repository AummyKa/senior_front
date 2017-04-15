
const INITIAL_STATE = {
  tours_data : ""

}
// { type: 'LOGIN_SUCCESS', text }
const getTours = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_ALL_TOURS_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_ALL_TOURS_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      return{
        tours_data : action.json,
        get_tour_success_status: true
      }

    case 'GET_ALL_TOURS_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getTours
