//This javascript file will be used to trigter all of the functions throughout the application
//With the exception of main.js, all other functions to be executed from the src directory.

//const createConfig = require('./createConfig');
const createNewUUIDs = require('./src/newUUIDs');
const fixUUIDs = require('./src/fixUUIDs');

const main = async () => {
    //await createConfig();
    await createNewUUIDs('communities');
    await createNewUUIDs('domains');
    await fixUUIDs();
}

main();