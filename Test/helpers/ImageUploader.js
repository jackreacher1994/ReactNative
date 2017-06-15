import RNFetchBlob from 'react-native-fetch-blob';

let upload = (data) => {
    RNFetchBlob.fetch('POST', 'http://localhost:3000', {
        Authorization : "Bearer access-token",
        otherHeader : "foo",
        'Content-Type' : 'multipart/form-data',
    }, data).then((resp) => {
        
    }).catch((err) => {
        
    });
}

export default upload