import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";

export default function Home() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)
  const [token, setToken] = useState("")


  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && (window as any).workbox !== undefined) {
      // run only in browser
      navigator.serviceWorker.ready.then(reg => {
        navigator.serviceWorker.register("../firebase-messaging-sw.js")
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

        getToken(messaging, {vapidKey: "BEY8Hn71h2eqsd9JkfrqV0pC3oJYqDJljlLg7u98qW7nV1P_IoDl3AHJ7q6RXAI5RiOVYPMh-8jk59vV5MdQVLY"}).then((currentToken) => {
          if (currentToken) {
            setToken(currentToken)
          } else {
            setToken('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          setToken('An error occurred while retrieving token. ' + err);
        });

        reg.pushManager.getSubscription().then(sub => {
          if (sub) {
            setSubscription(sub as any)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg as any)
      })
    }
  }, [])

  const installApp = () => {
    if (!installPromptEvent) return;

    (installPromptEvent as any).prompt();
    (installPromptEvent as any).userChoice.then((choice: any) => {
      if (choice.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setInstallPromptEvent(null);
    });
  };

  const notificationApp = async () => {
    Notification.requestPermission().then(async (result) => {
      if (result === 'granted') {
        

        //randomNotification();
      }
    });
  };

  const base64ToUint8Array = (base64:any) => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
  
    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const subscribeButtonOnClick = async (event: any) => {
    event.preventDefault()
    const sub = await (registration as any).pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    })
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub)
    setIsSubscribed(true)
    console.log('web push subscribed!')
    console.log(sub)
  }

  const sendNotificationButtonOnClick = async (event:any) => {
    event.preventDefault()
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }

    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription
      })
    })
  }

  const randomNotification = () => {
    const notif = Math.floor(Math.random() * 5) + 1;
    const title = 'Notification ' + notif;
    const options = {
      body: 'This is the body of the notification',
      icon: '/icons/icon-192x192.png'
    };
    new Notification(title, options);
    setTimeout(randomNotification, 5000);
  };


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <button onClick={installApp}>Install App</button>
        <button onClick={notificationApp}>Accept Agreement to Notifications</button>
        <button onClick={subscribeButtonOnClick}>Subscribe to Web Push</button>
        <button onClick={sendNotificationButtonOnClick}>Send Web Push Notification</button>
        <p>Your token is</p>
        <p>{token}</p>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
