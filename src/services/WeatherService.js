class WeatherService {
  constructor() {
    this.apiKey = 'CWB-67AD91E9-48BC-41F8-841B-379B40E7C768';
    this.apiURL = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${this.apiKey}&format=JSON`;
  }

  // Wx: 天氣現象.
  // MaxT: 最高溫度
  // MinT: 最低溫度
  // CI: 舒適度
  // PoP: 降雨機率
  async fetchAll() {
    return fetch(this.apiURL)
      .then(res => res.json())
      .then(res => {
        return res.records.location;
      })
      .catch(error => {
        return new Error(error);
      });
  }
}

export default new WeatherService();
