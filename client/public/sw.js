self.addEventListener("push", e => {
  console.log("Service Worker: Push Received");

  const { image, title, text, url } = e.data.json();

  const options = {
    data: url,
    body: text,
    icon: image
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", e => {
  const { url } = e.data.json();

  e.notification.close();

  e.waitUntil(clients.openWindow(url));
});
