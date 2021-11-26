class DataSatandings {
  static async getStandings() {
    return fetch('https://api.football-data.org/v2/competitions/2021/standings?standingType=TOTAL', {
      headers: {
        'X-Auth-Token': 'afe35bd658a449c485b7a28f9ce426d3'
      }      
    }).then(response => {
      if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText));
      } else {
        return Promise.resolve(response);
      }
    }).then(response => {
      return response.json();
    }).catch(error => {
      console.log(error);
    });
  }
}

export default DataSatandings;