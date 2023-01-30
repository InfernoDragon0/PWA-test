const { initializeApp } = require( "firebase/app");
const { getMessaging } =require("firebase/messaging/sw")

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDqUbUiCcRilLq8mJfo3p3csfUx9o6FN7E",
    authDomain: "canteen-e81e1.firebaseapp.com",
    projectId: "canteen-e81e1",
    storageBucket: "canteen-e81e1.appspot.com",
    messagingSenderId: "345832195402",
    appId: "1:345832195402:web:308ae5c28cfb3accb8adb3",
    measurementId: "G-D1C80TS1FY"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
console.log(await getToken(messaging, {vapidKey: "BEY8Hn71h2eqsd9JkfrqV0pC3oJYqDJljlLg7u98qW7nV1P_IoDl3AHJ7q6RXAI5RiOVYPMh-8jk59vV5MdQVLY"}))
