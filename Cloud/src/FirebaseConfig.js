import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAww1JWxJWsh_5C5omRmpLyrP1LUPHFLA8",
    authDomain: "rnative-2651f.firebaseapp.com",
    databaseURL: "https://rnative-2651f.firebaseio.com",
    projectId: "rnative-2651f",
    storageBucket: "rnative-2651f.appspot.com",
    messagingSenderId: "95755435725"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;