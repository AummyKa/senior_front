export const addCustomerModal = (type,tourID) => {
      switch (type) {
        case 'SHOW_ADD_CUSTOMER':
            return {
                type: 'SHOW_ADD_CUSTOMER',
                tourID: tourID,
            }

        case 'CLOSE_ADD_CUSTOMER':
            return {
                type: 'CLOSE_ADD_CUSTOMER'
            }

        default:
            return ""
    }
};
