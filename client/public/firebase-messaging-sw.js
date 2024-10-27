// firebase-messaging-sw.js (서비스 워커)
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js');

let messaging=null;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_ENV') {
    const firebaseConfig = {
      apiKey: event.data.apiKey,
      authDomain: event.data.authDomain,
      projectId: event.data.projectId,
      storageBucket: event.data.storageBucket,
      messagingSenderId: event.data.messagingSenderId,
      appId: event.data.appId,
    };

    try {
      // Firebase 초기화
      firebase.initializeApp(firebaseConfig);
      
      // Firebase Messaging 초기화
      messaging = firebase.messaging();
    } catch (error) {
      console.error('Firebase 초기화 중 오류 발생:', error);
    }

    // 백그라운드 메시지 처리
    messaging.onBackgroundMessage(function (payload) {
      console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신', payload);

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-16x16.png',  // 푸시 알림 아이콘 설정
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});