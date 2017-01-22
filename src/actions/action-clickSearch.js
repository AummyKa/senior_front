export const clickSearch = (type,value) => {
    switch (type) {
        case 'SEARCH_GUIDE':
            return {
                type: 'SEARCH_GUIDE',
                input: value
            }


        default:
            return ""
    }
};
