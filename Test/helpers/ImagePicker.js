var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select an image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

let pick = (callback) => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        callback(response.uri, response.data);
      }
    });
}

export default pick