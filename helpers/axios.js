const axios = require("axios");

const httpPost = async(url, data) => {
    return await axios.post(url, data);
};

module.exports = {
    httpPost,
};