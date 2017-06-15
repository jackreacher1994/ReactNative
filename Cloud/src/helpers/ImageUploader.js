var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseApp from '../FirebaseConfig';
import Platform from 'react-native';

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime='application/octet-stream') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS==='ios' ? uri.replace('file://', '') : uri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = storage.ref('images').child(`${sessionId}`);

        fs.readFile(uploadUri, 'base64')
          .then((data) => {
              return Blob.build(data, {type: `${mime};BASE64`});
          })
          .then((blob) => {
              uploadBlob = blob;
              return imageRef.put(blob, {contentType: mime});
          })
          .then(() => {
              uploadBlob.close();
              return imageRef.getDownloadURL();
          })
          .then((url) => {
            resolve(url);
          })
          .catch((error) => {
            reject(error);
          });
    });
};

var options = {
  title: 'Select an image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

let upload = (callback1, callback2) => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        callback1();
        uploadImage(response.uri)
            .then((uri) => callback2(uri))
            .catch((error) => console.log(error));
      }
    });
}

export default upload;