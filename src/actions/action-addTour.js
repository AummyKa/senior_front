export const addTour = (type,date) => {
    switch (type) {
        case 'ADD_TOUR':
            return {
                type: 'ADD_TOUR',
                showAddTourModal: true,
                dateTour: date
            }


        default:
            return ""
    }
};
