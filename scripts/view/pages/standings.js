import DataStandings from '../../data/data-standings.js';

const Standings = {
  async render() {
    return `
      <div class="section" id="container">
        <div class="row">
          <div class="col s12">
            <span class="flow-text">Peringkat Klub</span>
          </div>
          <div class="col s12">
            <table class="striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Klub</th>
                  <th class="hide-on-med-and-down">Kalah</th>
                  <th class="hide-on-med-and-down">Seri</th>
                  <th class="hide-on-med-and-down">Menang</th>
                  <th>Selisih Gol</th>
                  <th>Poin</th>
                </tr>
              </thead>
              <tbody id="standings-list"></tbody>
            </table>
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
      </div>
    `;
  },
  async afterRender() {
    const preloader = document.getElementById('preloader');
    const standingsListElement = document.getElementById('standings-list');

    try {
      const results = await DataStandings.getStandings();

      preloader.style.display = 'none';
      results.standings[0].table.forEach(result => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${result.position}</td>`;
        row.innerHTML += `<td>
                            <img  class="left" src="${result.team.crestUrl}" alt="${result.team.name}" width="20" height="20" />
                            <span style="margin-left: 8px">${result.team.name}</span>
                          </td>`;
        row.innerHTML += `<td class="hide-on-med-and-down">${result.lost}</td>`
        row.innerHTML += `<td class="hide-on-med-and-down">${result.draw}</td>`;
        row.innerHTML += `<td class="hide-on-med-and-down">${result.won}</td>`;
        row.innerHTML += `<td>${result.goalDifference}</td>`;
        row.innerHTML += `<td>${result.points}</td>`;

        standingsListElement.appendChild(row);
      });
    } catch (error) {
      preloader.style.display = 'none';
      console.log(error)
    }
  }
}

export default Standings;