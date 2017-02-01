const INITIAL_STATE = {
  curGuide : ''
}
// { type: 'LOGIN_SUCCESS', text }
const guideProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GUIDE_PROFILE':
      console.log(action)
      return {
        curGuide : action.key
      }
      default:
        return state

}
}

export default guideProfile
