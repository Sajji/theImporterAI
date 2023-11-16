const doesUUIDExist = require('./doesUUIDExist');

const domainTypes = async () => {
    const endpoint = 'domainTypes';
    const domainTypeUUID = '00000000-0000-0000-0000-000000003007';
    const domainTypeExists = await doesUUIDExist(endpoint, domainTypeUUID);
    if (domainTypeExists) {
        console.log('Domain type exists');
    } else {
        console.log('Domain type does not exist');
    }
}

domainTypes();