const INITIAL_STATE = {
  suggested_guide_name : '',
  isSuggestedGuide: false,
  showSuggestGuideModalStatus: false,
  guide_suggested_factors:[],
  showSuggestGuideModalFromEditStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const receiveSuggestedGuideName = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEND_SUGGESTED_GUIDE_NAME':

      return {
        suggested_guide_name: action.guide_name,
        showSuggestGuideModalStatus: action.showSuggestGuideModalStatus
      }

    case 'SEND_SUGGESTED_GUIDE_NAME_FROM_EDIT':
      return {
        suggested_guide_name: action.guide_name,
        showSuggestGuideModalFromEditStatus: action.showSuggestGuideModalFromEditStatus
      }

    case 'SHOW_SUGGESTED_GUIDE_MODAL':
      if(action.page === "add"){
        return {
          guide_suggested_factors: action.guide_suggested_factors,
          showSuggestGuideModalStatus: action.showSuggestGuideModalStatus,
        }
      }else if(action.page === "edit"){
        return {
          guide_suggested_factors: action.guide_suggested_factors,
          showSuggestGuideModalFromEditStatus: action.showSuggestGuideModalFromEditStatus
        }
      }


    default:
      return{
        isSuggestedGuide: false
      }
    }
}

export default receiveSuggestedGuideName
