function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVAPID = urlBase64ToUint8Array(
  "BAAFEAS-bvrj4_AM_9IXLWThPwuHdMk8BGvB0DcVdfCjFE4FloGL2o6xPEqN-DHnKRGdr3BBzhiOCYjoqc0XIVM"
);

const isPushNotificationSupported = () => {
  return "serviceWorker" in navigator && "PushManager" in window;
};

const registerSW = () => {
  return navigator.serviceWorker.register("/sw.js");
};

const askUserPermission = async () => {
  return await Notification.requestPermission();
};

const createNotificationSubscription = async () => {
  const serviceWorker = await navigator.serviceWorker.ready;
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVAPID
  });
};

const removeNotificationSubscription = async () => {
  const serviceWorker = await navigator.serviceWorker.ready;
  return await serviceWorker.pushManager.getSubscription();
};

const getUserExistingSubscription = () => {
  return navigator.serviceWorker.ready
    .then(serviceWorker => {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(subscription => {
      return subscription;
    });
};

export {
  registerSW,
  askUserPermission,
  getUserExistingSubscription,
  isPushNotificationSupported,
  removeNotificationSubscription,
  createNotificationSubscription
};
