const INITIAL_STATE = {
  deleteStaffStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const deleteStaff = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'DELETE_STAFF_ATTEMPT':

      return {
        //loading sign
      }
    case 'DELETE_STAFF_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      return {
        deleteStaffStatus: true
      }
    case 'DELETE_STAFF_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default deleteStaff
