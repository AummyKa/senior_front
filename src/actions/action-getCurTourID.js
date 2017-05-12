
// { type: 'LOGIN_SUCCESS', text }
export const getCurTourID = (type,id) => {
  switch (type) {
    case 'GET_CUR_TOUR_ID':
      return {
        tour_id: id,
        type: type
      }


    default:
      return{
        selectedTourID: ''
      }

}
}
