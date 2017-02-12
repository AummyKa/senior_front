const INITIAL_STATE = {
  curGuide : false,
  curGuideProfile : ''
}
// { type: 'LOGIN_SUCCESS', text }
const guideProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_GUIDE_PROFILE_ATTEMPT':

      return {

      }
    case 'GET_GUIDE_PROFILE_SUCCESS':
      console.log(action)
      return {
        curGuide : true,
        curGuideProfile : action.json
      }
    case 'GET_GUIDE_PROFILE_FAILED':

      return {

      }
      default:
        return state

}
}

export default guideProfile
