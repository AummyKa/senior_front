export const changePage = (page) => {
    switch (page) {
        case 'Home':
            return {
                type: 'MOVE_TO_HOME'
            }
        case 'GuideProfile':
            return {
                type: 'MOVE_TO_GUIDE'
            }
        case 'Schedule':
            return {
                type: 'MOVE_TO_SCHEDULE'
            }
        case 'Staff':
            return {
                type: 'MOVE_TO_STAFF'
            }
        case 'Tours':
            return {
                type: 'MOVE_TO_TOURS'
            }
        case 'Finance':
            return {
                type: 'MOVE_TO_FINANCE'
            }
        case 'PendingList':
            return {
                type: 'MOVE_TO_PENDINGLIST'
            }
        case 'Tours':
            return {
                type: 'MOVE_TO_TOURS'
            }

        default:
            return ""
    }
};
