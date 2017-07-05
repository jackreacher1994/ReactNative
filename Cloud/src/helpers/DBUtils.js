import firebaseApp from '../FirebaseConfig';

const emails = firebaseApp.database().ref('emails');

let setEmail = () => {
    emails.set({
        primary: 'abc@mail.com'
    });
}

let addEmail = () => {
    emails.push({
        other: 'xyz@mail.com'
    });
}

let getEmail = (callback) => {
    emails.child('primary').on('value', function(snapshot){
        callback(snapshot.val());
    });
}

let listenForChange = (callback1, callback2) => {
    emails.on('child_added', function(snapshot){
        callback1(snapshot.val().other, snapshot.key);
    });
    emails.on('child_removed', function(snapshot){
        callback2(snapshot.key);
    });
}

let removeEmail = (id) => {
    emails.child(id).remove();
}

export {setEmail, addEmail, getEmail, listenForChange, removeEmail};