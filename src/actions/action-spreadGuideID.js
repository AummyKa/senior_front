export const curGuideID = (type,id) => {

  switch (type) {
      case 'EACH_GUIDE_ID':
        console.log(id)
      return {
          type: 'EACH_GUIDE_ID',
          guide_id: id
      }
      default:
          return ""
      }

};
