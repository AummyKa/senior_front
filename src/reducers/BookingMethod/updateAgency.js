

const INITIAL_STATE = {
  updateAgencyDataStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const updateAgency = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'UPDATE_AGENCY_ATTEMPT':
      return {

      }

    case 'UPDATE_AGENCY_SUCCESS':
      console.log("success")
        return{
          updateAgencyDataStatus: true
        }

    case 'UPDATE_AGENCY_FAILED':
      console.log("fail")
        return{
          updateAgencyDataStatus: false
        }

    default:
      return state
    }
}

export default updateAgency
