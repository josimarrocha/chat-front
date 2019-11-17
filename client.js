const publicVapidKey = 'BKPXVQHYhME787seXXi1X9krd0AG0KgJKNyQEhbt1SfUa0qJl2zJgSmbyfFLUQOWxDSCChc_ZNCHpNilftMAF3I'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', registerService)
}

async function registerService() {
  const register = await navigator
    .serviceWorker
    .register('service-worker.js', {
      scope: '/chat-front'
    })

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })

  await fetch('https://api-chat-back.herokuapp.com/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  })
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}