

const INITIAL_STATE = {
  addUnAvailDateEachGuideStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const addUnAvailDateEachGuide = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_UNAVAIL_DATE_EACH_GUIDE_ATTEMPT':
      return {

      }

    case 'ADD_UNAVAIL_DATE_EACH_GUIDE_SUCCESS':
      console.log("success")
        return{
          addUnAvailDateEachGuideStatus: true
        }

    case 'ADD_UNAVAIL_DATE_EACH_GUIDE_FAILED':
      console.log("fail")
        return{
          addUnAvailDateEachGuideStatus: false
        }

    default:
      return state
    }
}

export default addUnAvailDateEachGuide
