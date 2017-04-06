import {Modal as modal} from 'antd'

export const deleteEachCustomer = (type, record) => {
    switch (type) {
        case 'DELETE_EACH_CUSTOMER_WARNING':
        let title = "You are going to delete the customer"
        let content = "If you delete it, the information will be permanently gone"

        modal.warning({
          title: title,
          content: content,
        });
          
        default:
            return ""
    }
};
