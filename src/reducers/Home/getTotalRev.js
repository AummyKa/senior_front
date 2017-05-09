
const INITIAL_STATE = {
  totalRevData: []
}
// { type: 'LOGIN_SUCCESS', text }
const getTotalRev = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_TOTAL_REV_ATTEMPT':
      return {
        //loading sign
      }
    case 'GET_TOTAL_REV_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }
          return {
          totalRevData: action.json
        }
    case 'GET_TOTAL_REV_FAILURE':
      return {
        //pop up
      }

    default:
      return state
  }
}

export default getTotalRev
