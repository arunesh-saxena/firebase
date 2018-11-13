const functions = require('firebase-functions');

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore
    .document('products/{productId}')
    .onCreate(event => {
        console.log(event.params);
        const docId = event.params.productId;
        const name = event.data.data().name;

        const productRef = admin.firestore().collection('products').doc(docId)

        return productRef.update({ message: `Nice ${name}! - Love cloud functions` })
    });

