
// { type: 'LOGIN_SUCCESS', text }
export const changeYearDashBoard = (type,selectedYear) => {
  switch (type) {
    case 'CHANGE_YEAR':
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
