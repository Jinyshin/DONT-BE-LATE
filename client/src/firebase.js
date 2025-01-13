// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import axios from 'axios';

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

const storeTokenInLocal = (fcmToken) =>{
  console.log("LocalStorage에 저장할 fcmToken: ", fcmToken);
  const currentToken = localStorage.getItem("FCMToken");
  console.log("현재 LocalStorage에 저장된 fcmToken: ", currentToken);
  if(!currentToken || currentToken !== fcmToken) {
    localStorage.setItem("FCMToken", fcmToken);
    console.log("LocalStorage에 fcmToken 저장 완료: ", fcmToken);
    storeTokenInDatabase();
  }
}

export const requestForToken = () => {

  if (!messaging) {
    console.error('Firebase messaging is not initialized.');
    return;
  }

  navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/firebase/' })
  .then((registration)=>{
      console.log('Service Worker is ready: ', registration);
      return getToken(
        messaging,  {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });
    })
    .then(async (currentToken) => {
      if (currentToken) {
        storeTokenInLocal(currentToken);
      } else {
        console.log('토큰을 가져올 수 없습니다.');
      }
    })
    .catch((err) => {
      console.error('토큰을 가져오는 중 오류 발생:', err);
    });
};

export const storeTokenInDatabase = async () =>{
  const fcmToken= localStorage.getItem("FCMToken");
  console.log('Database에 저장할 fcmToken: ', fcmToken);
  const token = localStorage.getItem('accessToken'); //jwt token
  console.log('JWT 토큰:', token);
  if (!token) {
    console.log('FCM 토큰 저장 대기: 로그인하지 않음');
    return;
  }
  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/notifications/save-token`,
    { token: fcmToken },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then(()=>{
    console.log('서버에 FCM 토큰 저장 요청 성공');
  })
  .catch((error)=>{
    console.error('FCM 토큰 서버 저장 요청 실패: ', error);
  });
  };