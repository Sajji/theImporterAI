const fs = require('fs');
const targetConfig = require('../targetConfig.json');
const doesUUIDExists = require('./doesUUIDExist.js');

const uniqueDomainTypesTree = JSON.parse(fs.readFileSync(`${targetConfig.backupDir}/uniqueDomainTypesTree.json`, 'utf-8'));

uniqueDomainTypesTree.forEach(item => {
    const idExists = doesUUIDExists(item.id, targetConfig);
    console.log(`ID: ${item.id}, Exists: ${idExists}`);
});