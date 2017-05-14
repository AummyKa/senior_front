

const INITIAL_STATE = {
  eachGuideUnAvailableEachDate: ""
}

// { type: 'LOGIN_SUCCESS', text }
const getEachGuideUnAvailableEachDate = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_EACH_GUIDE_UNAVAIL_EACH_DATE_ATTEMPT':
      return {

      }

    case 'GET_EACH_GUIDE_UNAVAIL_EACH_DATE_SUCCESS':
      console.log(action.json)
        return{
          eachGuideUnAvailableEachDate: action.json
        }

    case 'GET_EACH_GUIDE_UNAVAIL_EACH_DATE_FAILED':
        return{

        }

    default:
      return state
    }
}

export default getEachGuideUnAvailableEachDate
