import URLParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';
import DrawerIntiator from '../utils/drawer-initiator.js';

class App {
  constructor({ button, drawer, content }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;

    this.initialAppShell();
  }

  initialAppShell() {
    DrawerIntiator.init({
      button: this.button,
      drawer: this.drawer
    });
  }

  async renderPage() {
    const url = URLParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;