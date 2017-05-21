const INITIAL_STATE = {
  staffProfile : {},
  refreshStaffPage:false
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
    case 'REFRESH_STAFF_PAGE':
      return{
        refreshStaffPage:true
      }

    default:
      return ''

}
}

export default getStaffProfile
