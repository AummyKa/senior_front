
const INITIAL_STATE = {
  all_tours_name : ""

}
// { type: 'LOGIN_SUCCESS', text }
const getToursName = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_ALL_TOURS_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_ALL_TOURS_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      return{
        all_tours_name : action.json,
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

export default getToursName
