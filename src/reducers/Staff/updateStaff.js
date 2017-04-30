const INITIAL_STATE = {
  updatedStaff : {},
  updateStaffStatus : false

}

// { type: 'LOGIN_SUCCESS', text }
const updateStaff = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_STAFF_ATTEMPT':

      return {
        //loading sign
      }
    case 'UPDATE_STAFF_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      let data = action.json
      console.log(data)
      return {
        updatedStaff: data,
        updateStaffStatus: true
      }
    case 'UPDATE_STAFF_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default updateStaff
