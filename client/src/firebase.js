// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyC2dEgo0Jap-6EB1XGIInisylJzXcWx8-A",
    authDomain: "dontbelate-ys.firebaseapp.com",
    projectId: "dontbelate-ys",
    storageBucket: "dontbelate-ys.appspot.com",
    messagingSenderId: "829654009199",
    appId: "1:829654009199:web:e0abf7e4a5f0aa4ad9d49a"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
let messaging;
if (typeof windwo !== 'undefined' && 'serviceWorker' in navigator) {
  messaging = getMessaging(app);
}


export const requestForToken = () => {
  return getToken(messaging,  { vapidKey: '1:829654009199:web:e0abf7e4a5f0aa4ad9d49a' })
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
