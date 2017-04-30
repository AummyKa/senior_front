

const INITIAL_STATE = {
  deleteEachGuideExpertStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const deleteEachGuideExpert = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'DELETE_EACH_GUID_EXPERT_ATTEMPT':
      return {

      }

    case 'DELETE_EACH_GUID_EXPERT_SUCCESS':
      console.log("success")
        return{
          deleteEachGuideExpertStatus: true
        }

    case 'DELETE_EACH_GUID_EXPERT_FAILED':
      console.log("fail")
        return{
          deleteEachGuideExpertStatus: false
        }

    default:
      return state
    }
}

export default deleteEachGuideExpert
