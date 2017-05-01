

const INITIAL_STATE = {
  updateEachGuideExpertStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const updateEachGuideExpert = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'UPDATE_EXPERT_EACH_GUIDE_ATTEMPT':
      return {

      }

    case 'UPDATE_EXPERT_EACH_GUIDE_SUCCESS':
      console.log("success")
        return{
          updateEachGuideExpertStatus: true
        }

    case 'UPDATE_EXPERT_EACH_GUIDE_FAILED':
      console.log("fail")
        return{
          updateEachGuideExpertStatus: false
        }

    default:
      return state
    }
}

export default updateEachGuideExpert
