

const INITIAL_STATE = {
  guideIncomeSummary: []
}

// { type: 'LOGIN_SUCCESS', text }
const getGuideIncomeSummary = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_GUIDE_INCOME_SUMMARY_ATTEMPT':
      return {

      }

    case 'GET_GUIDE_INCOME_SUMMARY_SUCCESS':
      console.log("success")
        return{
          guideIncomeSummary: action.json
        }

    case 'GET_GUIDE_INCOME_SUMMARY_FAILED':
      console.log("fail")
        return{
          guideIncomeSummary: action.json
        }

    default:
      return state
    }
}

export default getGuideIncomeSummary
