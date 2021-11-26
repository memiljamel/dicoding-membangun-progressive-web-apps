import { getAll, deleteById } from '../../data/data-favorites.js';

const Favorites = {
  async render() {
    return `
      <div class="section" id="container">
        <div class="row">
          <div class="col s12">
            <span class="flow-text">Favorite</span>
          </div>
          <div id="favorites-list"></div>
        </div>
      </div>    
    `;
  },
  async afterRender() {
    const favoritesList = document.getElementById('favorites-list')
    
    try {
      const results = await getAll();

      results.forEach(result => {
        favoritesList.innerHTML += `
          <div class="col s12 m4">
            <div class="card">
              <div class="card-image">
                <img src="${result.crestUrl}" alt="${result.name}" height="280" />
                <a class="btn-floating halfway-fab light-blue darken-3"><i class="material-icons">delete_outline</i></a>
              </div>
              <div class="card-content">
                <span class="card-title black-text truncate">${result.name}</span>
                <a href="#/details/${result.id}">Selengkapnya</a>
              </div>
            </div>
          </div>
        `;
      });

      document.querySelectorAll('.btn-floating').forEach((element, index) => {
        element.addEventListener('click', () => {
          deleteById(results[index].id);
        });
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export default Favorites;