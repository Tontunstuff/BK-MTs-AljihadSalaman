import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Daftarkan Service Worker (wajib agar aplikasi bisa dipasang & dibungkus PWABuilder)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.error('Service Worker gagal didaftarkan:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
