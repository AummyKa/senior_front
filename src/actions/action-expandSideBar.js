export const expandSideBar = (type,showSideBar) => {
      switch (type) {
        case 'TOGGLE_SIDEBAR':
            return {
                type: type,
                showSideBar: showSideBar,
            }

        default:
            return ""
    }
};
