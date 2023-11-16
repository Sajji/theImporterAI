const fs = require('fs').promises;
const axios = require('axios');
const path = require('path');

const targetConfigPath = path.join(__dirname, '../targetConfig.json');

const doesUUIDExist = async (endpoint, UUID) => {
    const targetConfig = JSON.parse(await fs.readFile(targetConfigPath));
    const targetApiURL = targetConfig.targetApiURL;
    const targetGETURL = `${targetApiURL}/${endpoint}/${UUID}`;
    console.log(targetGETURL);

    try {
        const response = await axios.get(targetGETURL, {
            auth: {
                username: targetConfig.targetUsername,
                password: targetConfig.targetPassword
            }
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

module.exports = doesUUIDExist;