import DataTeams from '../../data/data-teams.js';
import { saveForLater } from '../../data/data-favorites.js';

const Teams = {
  async render() {
    return `
      <div class="section" id="container">
        <div class="row">
          <div class="col s12">
            <span class="flow-text">Daftar Klub</span>
          </div>
          <div id="teams-list"></div>
          <div class="preloader-wrapper active" id="preloader">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  async afterRender() {
    const preloader = document.getElementById('preloader');
    const teamsList = document.getElementById('teams-list');

    try {
      const results = await DataTeams.getTeams();

      preloader.style.display = 'none';
      results.teams.forEach(result => {
        teamsList.innerHTML += `
          <div class="col s12 m4">
            <div class="card">
              <div class="card-image">
                <img src="${result.crestUrl}" alt="${result.name}" height="280" />
                <a class="btn-floating halfway-fab light-blue darken-3"><i class="material-icons">add</i></a>
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
          saveForLater(results.teams[index]);
        });
      });
    } catch (error) {
      preloader.style.display = 'none';
      console.log(error)
    }
  }
}

export default Teams;