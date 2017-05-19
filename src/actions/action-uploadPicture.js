export const uploadPicture = (type) => {
      switch (type) {
        case 'UPLOAD_PICTURE_SUCCESS':

            return {
                type: 'UPLOAD_PICTURE_SUCCESS',
                uploadPictureStatus: true,
            }

        case 'UPLOAD_PICTURE_FAILED':
            return {
                type: 'UPLOAD_PICTURE_FAILED',
                uploadPictureStatus: false,
            }

        default:
            return ""
    }
};
