import Cookies from 'js-cookie'

const INITIAL_STATE = {
  curGuide : false,
  curGuideProfile : '',
  guide_id: ''
}
// { type: 'LOGIN_SUCCESS', text }
const guideProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EACH_GUIDE_ID':

    Cookies.set('guide_id', action.guide_id)

    return{
        curGuide : true,
        guide_id : action.guide_id
    }
    case 'GET_GUIDE_PROFILE_ATTEMPT':
      return {

      }
    case 'GET_GUIDE_PROFILE_SUCCESS':

      return {

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
