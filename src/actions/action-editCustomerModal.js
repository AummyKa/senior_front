export const editCustomerModal = (type,record) => {
      switch (type) {
        case 'SHOW_EDIT_CUSTOMER':
        console.log(record)
            return {
                type: 'SHOW_EDIT_CUSTOMER',
                customerData: record,
            }

        case 'CLOSE_EDIT_CUSTOMER':
          console.log("finish")
            return {
                type: 'CLOSE_EDIT_CUSTOMER'
            }

        default:
            return ""
    }
};
