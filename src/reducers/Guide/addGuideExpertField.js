

const INITIAL_STATE = {
  addGuideExpertStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const addGuideExperField = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_GUIDE_EXPERT_FIELD_ATTEMPT':
      return {

      }

    case 'ADD_GUIDE_EXPERT_FIELD_SUCCESS':
      console.log("success")
        return{
          addGuideExpertStatus: true
        }

    case 'ADD_GUIDE_EXPERT_FIELD_FAILED':
      console.log("fail")
        return{
          addGuideExpertStatus: false
        }

    default:
      return state
    }
}

export default addGuideExperField
