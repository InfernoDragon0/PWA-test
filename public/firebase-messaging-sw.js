import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

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

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  