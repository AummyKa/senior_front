

const INITIAL_STATE = {
  allUnAvailDateEachGuide: []
}

// { type: 'LOGIN_SUCCESS', text }
const getAllUnAvailDateEachGuide = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_ALL_UNAVAIL_DATE_EACH_GUIDE_ATTEMPT':
      return {

      }

    case 'GET_ALL_UNAVAIL_DATE_EACH_GUIDE_SUCCESS':
      console.log("success")
        return{
          allUnAvailDateEachGuide: action.json.payload
        }

    case 'GET_ALL_UNAVAIL_DATE_EACH_GUIDE_FAILED':
      console.log("fail")
        return{
        }

    default:
      return state
    }
}

export default getAllUnAvailDateEachGuide
