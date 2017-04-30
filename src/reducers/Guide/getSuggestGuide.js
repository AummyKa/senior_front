

const INITIAL_STATE = {
  listGuideSuggestion: [],
  getGuideSuggestionStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const getSuggestGuide = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_GUIDE_SUGGESTION_ATTEMPT':
      return {

      }

    case 'GET_GUIDE_SUGGESTION_SUCCESS':
      console.log("success")
        return{
          listGuideSuggestion: action.json,
          getGuideSuggestionStatus: true
        }

    case 'GET_GUIDE_SUGGESTION_FAILED':
      console.log("fail")
        return{
          getGuideSuggestionStatus: false
        }

    default:
      return state
    }
}

export default getSuggestGuide
