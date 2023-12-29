importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAM3F0ZSDKh6psghd6CYEZRnzC8C1EEGV0",
    authDomain: "case-hearing-faf4a.firebaseapp.com",
    projectId: "case-hearing-faf4a",
    storageBucket: "case-hearing-faf4a.appspot.com",
    messagingSenderId: "69825110898",
    appId: "1:69825110898:web:076c19aa1f1b72310df3eb",
    measurementId: "G-R2TZ4EE645"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});