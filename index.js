import App from './scripts/view/App.js';
import swRegister from './scripts/utils/sw-register.js';
import notifRegister from './scripts/utils/notif-register.js';

const app = new App({
  button: document.getElementById('mobile-demo'),
  drawer: document.querySelectorAll('ul a'),
  content: document.getElementById('content')
});

window.addEventListener('hashchange', () => {
  document.getElementById('container');
  app.renderPage();
});

document.addEventListener('DOMContentLoaded', () => {
  app.renderPage();
  swRegister();
  notifRegister();
});