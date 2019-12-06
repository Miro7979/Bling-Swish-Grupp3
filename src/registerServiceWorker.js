class RegisterServiceWorker {

  constructor() {
    this.debug = false;
    this.routeToServiceWorker = '/serviceWorker.js';
    // check browser support, if support call register
    'serviceWorker' in navigator && this.register();
  }

  log(...args) {
    this.debug && console.log.apply(
      console, ['RegisterServiceWorker:', ...args]
    );
  }

  async register() {
    // check if there are any registrered service workers
    let registrations = await navigator.serviceWorker.getRegistrations();
    // wait for the service worker to register
    // or return an error

    let error, registered = await navigator.serviceWorker
      .register(this.routeToServiceWorker)
      .catch(e => error = e);
    this.log(error ? error : `scope: ${registered.scope}`);
    await this.registerPushNotifications(registered);
    // you could reload to save one "cycle" of uncached content
    // if this is the first time the service worker registrers
    registrations.length === 0 && window.location.reload();

  }

  async registerPushNotifications(registered) {
    const publicVapidKey = 'BH_WGf-8nB-Jm-I3noFwMl2sByECoCZQjMwJoK40y2PLQSFqAgilGxV10ugUTMlmtms77Eqi-SYXBk-nw2BfNU4';
    // Register
    const subscription = await registered.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
    });
    this.log('push notifications registrered');
    // Send to subscribe on backend
    await fetch('/api/push-subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(subscription)
    });
    this.log('subscribed to push notifications');
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

}

new RegisterServiceWorker();