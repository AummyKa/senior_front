const INITIAL_STATE = {
  approveUser : false
}

// { type: 'LOGIN_SUCCESS', text }
const pendingUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'APPROVE_PENDING_USER_ATTEMPT':

      return {
        //loading sign
      }
    case 'APPROVE_PENDING_USER_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      console.log("approve success")
        return {

      }
    case 'APPROVE_PENDING_USER__FAILED':

      console.log("approve fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default pendingUser
