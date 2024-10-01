// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

let messaging;
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  messaging = getMessaging(app);
}


export const requestForToken = () => {

  if (!messaging) {
    console.error('Firebase messaging is not initialized.');
    return;
  }

  return getToken(messaging,  { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log('FCM 토큰:', currentToken);
        // 서버에 토큰을 저장하는 로직 추가
      } else {
        console.log('토큰을 가져올 수 없습니다.');
      }
    })
    .catch((err) => {
      console.error('토큰을 가져오는 중 오류 발생:', err);
    });
};
