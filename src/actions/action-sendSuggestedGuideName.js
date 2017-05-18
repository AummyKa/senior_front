
// { type: 'LOGIN_SUCCESS', text }
export const sendSuggestedGuideName = (type,payload) => {
  switch (type) {
    case 'SEND_SUGGESTED_GUIDE_NAME':
      return {
        guide_name: payload.guideName,
        guide_id:payload._id,
        type: type,
        showSuggestGuideModalStatus: false
      }

    case 'SEND_SUGGESTED_GUIDE_NAME_FROM_EDIT':
        return {
          guide_name: payload.guideName,
          guide_id:payload._id,
          type: type,
          showSuggestGuideModalFromEditStatus: false
        }

    case 'SHOW_SUGGESTED_GUIDE_MODAL':
        if(payload.page === "add"){
          return{
            showSuggestGuideModalStatus: true,
            guide_suggested_factors: payload,
            type: type,
            page: payload.page
          }
        }else if(payload.page === "edit"){
          return{
            showSuggestGuideModalFromEditStatus: true,
            guide_suggested_factors: payload,
            type: type,
            page: payload.page
          }
        }

    default:
      return ''
}
}
