export const closeAllTourBox = (type) => {
    switch (type) {

        case 'CLOSE_ALL_TOURS':
            return {
                type: 'CLOSE_ALL_TOURS',
                inVisible: true
            }

        default:
            return ""
    }
};
