

const INITIAL_STATE = {
  updateEachGuideStatusStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const updateEachGuideStatus = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'UPDATE_EACH_GUIDE_STATUS_ATTEMPT':
      return {

      }

    case 'UPDATE_EACH_GUIDE_STATUS_SUCCESS':
      console.log("success")
        return{
          updateEachGuideStatusStatus: true
        }

    case 'UPDATE_EACH_GUIDE_STATUS_FAILED':
      console.log("fail")
        return{
          updateEachGuideStatusStatus: false
        }

    default:
      return state
    }
}

export default updateEachGuideStatus
