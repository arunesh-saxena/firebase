document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();

    const db = firebase.firestore();

    const myPost = db.collection("posts").doc('firstpost');

    /* myPost.get().then(doc => {
        const data = doc.data();
        console.log(data);
        document.write(data.title + `<br/>`);
        document.write(data.created_at);
    }); */
    /* realtime DB */
    myPost.onSnapshot(doc => {
        const data = doc.data();
        console.log(data);
        document.querySelector('#title').innerHTML = data.title;
        // document.write(data.title + `<br/>`);
        // document.write(data.createdAt);
    });

    /* Product collention */
    const productsRef = db.collection('products');
    const query = productsRef.where('price', '>=', 10);

    query.get()
        .then(products => {
            console.log(products);
            let list = [];
            products.forEach(doc => {
                data = doc.data();
                list.push(`${data.name} at ${data.price}`);
            });

            document.querySelector('#productList').innerHTML = list.join('<br/>');
        });
});

/* updating title */
function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({ title: e.target.value });
}


/* google authentication */
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        document.querySelector('#username').innerHTML = `Hello ${user.displayName}`;
    })
        .catch(console.log)
}

/* file upload */

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const horseRef = storageRef.child('horse.jpg');

    const file = files.item(0);

    const task = horseRef.put(file);

    task.then(snapshot => {
        console.log(snapshot);
        let url = '';
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            url = downloadURL;
            document.querySelector('#imgUpload').setAttribute('src', url);
        });
    })

}