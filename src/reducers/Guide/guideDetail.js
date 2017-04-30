const INITIAL_STATE = {
  guideLists : {}
}

// { type: 'LOGIN_SUCCESS', text }
const guideDetail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_GUIDE_ATTEMPT':

      return {
        //loading sign
      }
    case 'GET_GUIDE_SUCCESS':
      // action: { type: 'LOGIN_SUCCESS', json: { token: '' }}
      let data = action.json
      return {
        guideLists: data
      }
    case 'GET_GUIDE_FAILED':
        console.log("fail")
      return {
        //pop up
      }

    default:
      return ''

}
}

export default guideDetail
