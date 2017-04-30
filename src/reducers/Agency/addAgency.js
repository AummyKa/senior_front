

const INITIAL_STATE = {
  addAgencyDataStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const addAgency = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_NEW_AGENCY_ATTEMPT':
      return {

      }

    case 'ADD_NEW_AGENCY_SUCCESS':
      console.log("success")
        return{
          addAgencyDataStatus: true
        }

    case 'ADD_NEW_AGENCY_FAILED':
      console.log("fail")
        return{
          addAgencyDataStatus: false
        }

    default:
      return state
    }
}

export default addAgency
