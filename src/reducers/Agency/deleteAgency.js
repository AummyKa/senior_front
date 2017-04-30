

const INITIAL_STATE = {
  deleteAgencyDataStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const deleteAgency = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'DELETE_AGENCY_ATTEMPT':
      return {

      }

    case 'DELETE_AGENCY_SUCCESS':
      console.log("success")
        return{
          deleteAgencyDataStatus: true
        }

    case 'DELETE_AGENCY_FAILED':
      console.log("fail")
        return{
          deleteAgencyDataStatus: false
        }

    default:
      return state
    }
}

export default deleteAgency
