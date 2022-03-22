const apiClient = require('./ApiClient');

module.exports = class DuckApiClient {

    async randomDuck() {
      const response = await apiClient.getRequest('https://random-d.uk/api/random');
      return JSON.parse(response);
    }
};
