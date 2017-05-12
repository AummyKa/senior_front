
// { type: 'LOGIN_SUCCESS', text }
export const changeYearDashBoard = (type,selectedYear) => {
  switch (type) {
    case 'CHANGE_YEAR':
      return {
        selectedYear: selectedYear,
        type: type
      }
    case 'CHANGE_TOUR_DASHBOARD_YEAR':
    console.log(selectedYear)
      return {
        selectedYear: selectedYear,
        type: type
      }

    default:
      return{

  }

}
}
