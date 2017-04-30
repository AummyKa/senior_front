

const INITIAL_STATE = {
  agencyData: [],
  getAgencyDataStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const getAgency = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_AGENCY_ATTEMPT':
      return {

      }

    case 'GET_AGENCY_SUCCESS':
      console.log("success")
        return{
          agencyData: action.json,
          getAgencyDataStatus: true
        }

    case 'GET_AGENCY_FAILED':
      console.log("fail")
        return{
          getGuideSuggestionStatus: false
        }

    default:
      return state
    }
}

export default getAgency
