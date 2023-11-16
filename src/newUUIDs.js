//The targetConfig.json file will be used for all functions.
//This javascript code will be used to create new UUIDs throughout the application
//Start by using the backupDir value in targetConfig.json to locate the extractedData directory
//Then read the file called communities.json. This file contains all of the community UUIDs from the source system.
//Let's iterate through the array of communities and create a new UUID for each one.
//Then let's generate a mapping file that contains old UUIDs and new UUIDs.
//Finally, let's write the new communities.json file to the tempFilesDir directory.

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const targetConfigPath = path.join(__dirname, '../targetConfig.json');

const createNewUUIDs = async (endpoint) => {
    const targetConfig = JSON.parse(fs.readFileSync(targetConfigPath));
    const backupDir = targetConfig.backupDir;
    const tempFilesDir = path.join(__dirname, '../tempFilesDir');

    const filePath = path.join(backupDir, `${endpoint}.json`);
    const items = JSON.parse(fs.readFileSync(filePath));

    const mapping = [];
    items.forEach(item => {
        const oldUUID = item.id;
        const newUUID = uuidv4();
        mapping.push({ oldUUID, newUUID });
        item.id = newUUID;
    });

    const mappingFilePath = path.join(tempFilesDir, `${endpoint}Mappings.json`);
    fs.writeFileSync(mappingFilePath, JSON.stringify(mapping, null, 4));

    const newFilePath = path.join(tempFilesDir, `${endpoint}.json`);
    fs.writeFileSync(newFilePath, JSON.stringify(items, null, 4));
}

module.exports = createNewUUIDs;