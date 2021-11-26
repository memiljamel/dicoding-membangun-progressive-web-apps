import Standings from '../view/pages/standings.js';
import Teams from '../view/pages/teams.js';
import Details from '../view/pages/details.js';
import Favorites from '../view/pages/favorites.js';

const routes = {
  '/': Standings,
  '/standings': Standings,
  '/teams': Teams,
  '/details/:id': Details,
  '/favorites': Favorites
}

export default routes;