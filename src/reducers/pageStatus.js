
const INITIAL_STATE = {
  pageMove: ""
}


const pageStatus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'MOVE_TO_HOME': //home
        return{
          pageMove: "home"
        }

    case 'MOVE_TO_GUIDE': //guide
        return{
          pageMove: "guide"
        }

    case 'MOVE_TO_SCHEDULE'://schedule
        return{
          pageMove: "schedule"
        }

    case 'MOVE_TO_STAFF': //staff
        return{
          pageMove: "staff"
        }

    case 'MOVE_TO_TOURS': //tour
        return{
          pageMove: "tours"
        }
    case 'MOVE_TO_FINANCE': //tour
        return{
          pageMove: "finance"
        }

    default:
      return state
  }

}

export default pageStatus
