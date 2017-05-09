
const INITIAL_STATE = {
  totalRevTable: []
}
// { type: 'LOGIN_SUCCESS', text }
const getTotalRevTable = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_TOTAL_REV_TABLE_ATTEMPT':
      return {

      }
    case 'GET_TOTAL_REV_TABLE_SUCCESS':
    console.log(action.json)
      return {
        totalRevTable: action.json
      }
    case 'GET_TOTAL_REV_TABLE_FAILED':

      return {

      }

      default:
        return state

}
}

export default getTotalRevTable
