const INITIAL_STATE = {
  staffLists : {}
}

// { type: 'LOGIN_SUCCESS', text }
const getStaffLists = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_STAFF_ATTEMPT':

      return {
        //loading sign
      }
    case 'GET_STAFF_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      let data = action.json
      console.log(data)
      return {
        staffLists: data
      }
    case 'GET_STAFF_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default getStaffLists
