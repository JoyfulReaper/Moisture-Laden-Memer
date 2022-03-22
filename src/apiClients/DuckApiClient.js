const { getRequest } = require('./ApiClient.js');

module.exports = class DuckApiClient {

    async randomDuck() {
      const response = await getRequest('https://random-d.uk/api/random');
      return response;
    }
};