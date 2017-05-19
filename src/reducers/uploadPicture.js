const INITIAL_STATE = {
  uploadPictureStatus: false,
  removePictureStatus: false
}

// { type: 'LOGIN_SUCCESS', text }
const uploadPicture = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPLOAD_PICTURE_SUCCESS':
    console.log("success")
      return {
        uploadPictureStatus: action.uploadPictureStatus
      }
    case 'UPLOAD_PICTURE_FAILED':
      return {
        uploadPictureStatus: action.uploadPictureStatus
      }
    case 'REMOVE_PICTURE_PATH_ATTEMPT':
      return{
        removePictureStatus: true
      }

    default:
      return ''

}
}

export default uploadPicture
