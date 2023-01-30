// self.addEventListener('push', function (event) {
//     const data = JSON.parse(event.data.text())
//     event.waitUntil(
//       registration.showNotification(data.title, {
//         body: data.message,
//         icon: '/icons/icon-192x192.png'
//       })
//     )
//   })
  
//   self.addEventListener('notificationclick', function (event) {
//     event.notification.close()
//     event.waitUntil(
//       clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
//         if (clientList.length > 0) {
//           let client = clientList[0]
//           for (let i = 0; i < clientList.length; i++) {
//             if (clientList[i].focused) {
//               client = clientList[i]
//             }
//           }
//           return client.focus()
//         }
//         return clients.openWindow('/')
//       })
//     )
//   })

import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
    apiKey: "AIzaSyDqUbUiCcRilLq8mJfo3p3csfUx9o6FN7E",
    authDomain: "canteen-e81e1.firebaseapp.com",
    projectId: "canteen-e81e1",
    storageBucket: "canteen-e81e1.appspot.com",
    messagingSenderId: "345832195402",
    appId: "1:345832195402:web:308ae5c28cfb3accb8adb3",
    measurementId: "G-D1C80TS1FY"
  };

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

self.addEventListener('push', (event) => {
    console.log('[firebase-messaging-sw.js] Push received. ', event);

    onBackgroundMessage(messaging, (payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        const notificationTitle = 'Background Message Title';
        const notificationOptions = {
            body: 'Background Message body.',
            icon: '/icons/icon-192x192.png'
        };

        //waituntil 
        return event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions))
    });
    return event.waitUntil(self.registration.showNotification("notificationTitle", {body: "notificationOptions"}))
        
});

// [END messaging_on_background_message_modular]