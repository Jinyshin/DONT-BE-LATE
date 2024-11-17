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
    messaging.onBackgroundMessage((payload)=>{
      console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신', payload);

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-16x16.png',  // 푸시 알림 아이콘 설정
        data: payload.data,
      };

      console.log('알림표시 전: ', notificationTitle, notificationOptions);

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});

self.addEventListener('notificationclick',function(event){
  event.notification.close();
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList)=>{
      const client =clientList.find((c)=> c.visibilityState === 'visible');
      const targetUrl = '/notifications';
      if (client){
        //창이 열려있는 경우
        client.postMessage({
          type: 'OPEN_MODAL',
          data: event.notification.data
        });
        return client.navigate(targetUrl).then(()=> client.focus);
      }
      else{
        //새 창이 필요한 경우
        return clients.openWindow(targetUrl).then((newClient)=>{
          newClient.postMessage({
            type: 'OPEN_MODAL',
            data: event.notification.data});
        });
      }
    })
  );
});