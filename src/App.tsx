import React, { useEffect, useState } from 'react';
import { Mail, Moon, Sun } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MailList } from './components/MailList';
import { setTheme } from '../stores/style'
import { io, Socket } from 'socket.io-client';
import styles from './styles/layout.module.css';
import { useMailStore } from './store/mailStore';
import moment from 'moment';

function App() {
  const { setMails } = useMailStore();
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  async function getMessages() {
    fetch(`https://jonathancostamoura-imofsf13.b4a.run/api/messages`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.data.map(message => ({from: message.userEmail, body: message.content, date: moment(message.createdAt).format("DD/MM/YYYY")}))
        setMails(formattedData);
      });

  }

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setTheme(isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    // Initialize Socket.IO connection
    const socketIo = io(`https://jonathancostamoura-imofsf13.b4a.run`, {
      transports: ['websocket'],
      autoConnect: true
    });

    socketIo.on('connect', () => {
      console.log('Connected to Socket.IO');
    });

    socketIo.on('new-message', () => {
      getMessages()
    })

    socketIo.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });
    getMessages()
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Mail size={24} className={styles.headerIcon} />
          <h1 className={styles.headerTitle}>LOGGER</h1>
          <br></br>
          <h3>Mail receiveng and filtering</h3>
        </div>
        <button
          className={styles.themeToggle}
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>
      <main className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
        <section className={styles.content}>
          <MailList />
        </section>
      </main>
    </div>
  );
}

export default App;
