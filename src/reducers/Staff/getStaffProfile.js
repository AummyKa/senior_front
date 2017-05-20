const INITIAL_STATE = {
  staffProfile : {}
}

// { type: 'LOGIN_SUCCESS', text }
const getStaffProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_STAFF_PROFILE_ATTEMPT':

      return {
        //loading sign
      }
    case 'GET_STAFF_PROFILE_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      let data = action.json
      console.log(data)
      return {
        staffProfile: data
      }
    case 'GET_STAFF_PROFILE_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default getStaffProfile
