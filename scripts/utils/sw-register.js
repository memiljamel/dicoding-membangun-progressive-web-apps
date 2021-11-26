const swRegister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js').then(() => {
        console.log('Service worker terdaftar!.')
      }).catch(error => {
        console.log(error);
      });
  } else {
    console.log('Browser tidak mendukung service worker!')
  }
}

export default swRegister;