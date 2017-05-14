

const INITIAL_STATE = {
  yearlyTotalCostFromGuide: []
}

// { type: 'LOGIN_SUCCESS', text }
const getYearlyTotalCostFromGuide = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_ATTEMPT':
      return {

      }

    case 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_SUCCESS':
      console.log("success")
        return{
          yearlyTotalCostFromGuide: action.json
        }

    case 'GET_YEARLY_TOTAL_COST_FROM_GUIDE_FAILED':
      console.log("fail")
        return{
          yearlyTotalCostFromGuide: action.json
        }

    default:
      return state
    }
}

export default getYearlyTotalCostFromGuide
