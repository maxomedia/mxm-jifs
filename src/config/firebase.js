import firebase from 'firebase';
import Vue from 'vue';
import vuefire from 'vuefire';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_4LyOyPWFLtfiGxDBKXRrHFq8wSusa4c",
    authDomain: "mxm-jifs.firebaseapp.com",
    databaseURL: "https://mxm-jifs.firebaseio.com",
    storageBucket: "mxm-jifs.appspot.com",
    messagingSenderId: "550980380047"
};

firebase.initializeApp(config);

Vue.use(vuefire);

export default firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();