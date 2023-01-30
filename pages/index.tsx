import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

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

  const notificationApp = () => {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        randomNotification();
      }
    });
  };

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
