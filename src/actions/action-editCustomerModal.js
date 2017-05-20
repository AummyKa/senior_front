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

        case 'SHOW_DELETE_CUSTOMER_MODAL':
          console.log(record)
            return {
                type:'SHOW_DELETE_CUSTOMER_MODAL',
                email:record
            }

        case 'CLOSE_DELETE_CUSTOMER_MODAL':
            return {
                type:'CLOSE_DELETE_CUSTOMER_MODAL',
            }


        default:
            return ""
    }
};
