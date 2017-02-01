export const eachGuide = (type,key) => {
    switch (type) {
        case 'GUIDE_PROFILE':
        console.log(key)
            return {
                type: 'GUIDE_PROFILE',
                guide: key
            }


        default:
            return ""
    }
};
