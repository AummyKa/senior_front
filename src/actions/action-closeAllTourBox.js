export const closeAllTourBox = (type,id) => {
      switch (type) {
        case 'CLOSE_ALL_TOURS':
            return {
                type: 'CLOSE_ALL_TOURS',
                inVisible: true,
                id: id
            }

        case 'FINISH_CLOSE_ALL_TOURS':
          console.log("finish")
            return {
                type: 'FINISH_CLOSE_ALL_TOURS',
                inVisible: false
            }

        default:
            return ""
    }
};
