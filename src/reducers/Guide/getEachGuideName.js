

const INITIAL_STATE = {
  eachGuideName: ""
}

// { type: 'LOGIN_SUCCESS', text }
const getEachGuideName = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_GUIDE_NAME_ATTEMPT':
      return {

      }

    case 'GET_GUIDE_NAME_SUCCESS':
      console.log("close add tour")
        return{
          eachGuideName: action.json
        }

    case 'GET_GUIDE_NAME_FAILED':
        return{

        }

    default:
      return state
    }
}

export default getEachGuideName
