const INITIAL_STATE = {
  pendingUsers : {}
}

// { type: 'LOGIN_SUCCESS', text }
const pendingUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PENDING_USER_ATTEMPT':

      return {
        //loading sign
      }
    case 'GET_PENDING_USER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      let data = action.json
      console.log("hello")
      console.log(data)
      return {
        pendingUsers: data
      }
    case 'GET_PENDING_USER_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default pendingUser
