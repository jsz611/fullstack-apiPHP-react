// This optional code is used to register a service worker.
// register() is not called by default.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker.register(swUrl)
        .then(registration => {
          console.log('Service worker registered successfully:', registration);
          if (config && config.onSuccess) {
            config.onSuccess(registration);
          }
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister()
          .then(() => {
            console.log('Service worker unregistered successfully');
          })
          .catch(error => {
            console.error(error.message);
          });
      })
      .catch(error => {
        console.error('Error during service worker unregistration:', error);
      });
  }
}
