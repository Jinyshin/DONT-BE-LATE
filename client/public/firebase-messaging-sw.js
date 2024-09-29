// firebase-messaging-sw.js (서비스 워커)
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js');

// Firebase 초기화
firebase.initializeApp({
  apiKey: "AIzaSyC2dEgo0Jap-6EB1XGIInisylJzXcWx8-A",
  authDomain: "dontbelate-ys.firebaseapp.com",
  projectId: "dontbelate-ys",
  storageBucket: "dontbelate-ys.appspot.com",
  messagingSenderId: "829654009199",
  appId: "1:829654009199:web:e0abf7e4a5f0aa4ad9d49a",
});

// Firebase Messaging 초기화
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-16*16.png'  // 푸시 알림 아이콘 설정
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2dEgo0Jap-6EB1XGIInisylJzXcWx8-A",
  authDomain: "dontbelate-ys.firebaseapp.com",
  projectId: "dontbelate-ys",
  storageBucket: "dontbelate-ys.appspot.com",
  messagingSenderId: "829654009199",
  appId: "1:829654009199:web:e0abf7e4a5f0aa4ad9d49a",
  measurementId: "G-509WZ7D2Q0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// 알림 권한 요청 및 토큰 받기
async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('알림 권한이 허용되었습니다.');
      const currentToken = await getToken(messaging, { vapidKey: '1:829654009199:web:e0abf7e4a5f0aa4ad9d49a' });  // VAPID 키로 대체
      if (currentToken) {
        console.log('FCM 토큰:', currentToken);
        // 서버에 토큰을 저장하는 로직 추가
      } else {
        console.log('FCM 토큰을 가져올 수 없습니다.');
      }
    } else {
      console.log('알림 권한이 거부되었습니다.');
    }
  } catch (error) {
    console.error('권한 요청 또는 토큰 수신 중 오류 발생:', error);
  }
}

// 권한 요청 함수 호출
requestPermission();

// 포그라운드 메시지 처리
onMessage(messaging, (payload) => {
  console.log('포그라운드 메시지 수신:', payload);
  // 알림 표시 로직 추가
});

*/
