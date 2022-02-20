const axios = require('axios');

const getRequest = async (url) => {
    try {
        const response = await axios.get(url);

        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(`ApiClient getRequest: ${error}`);
    }
};

module.exports.getRequest = getRequest;