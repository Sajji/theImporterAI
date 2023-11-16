const fs = require('fs').promises;
const path = require('path');

const targetConfigPath = path.join(__dirname, '../targetConfig.json');

const fixUUIDs = async () => {
    const targetConfig = JSON.parse(await fs.readFile(targetConfigPath));
    const tempFilesDir = path.join(__dirname, '../tempFilesDir');

    const mappingFilePath = path.join(tempFilesDir, 'communitiesMappings.json');
    const mapping = JSON.parse(await fs.readFile(mappingFilePath));

    const communitiesFilePath = path.join(tempFilesDir, 'communities.json');
    const communities = JSON.parse(await fs.readFile(communitiesFilePath));
    communities.forEach(community => {
        const map = mapping.find(m => m.oldUUID === community.parentId);
        if (map) {
            community.parentId = map.newUUID;
        }
    });
    await fs.writeFile(communitiesFilePath, JSON.stringify(communities, null, 4));

    const domainsFilePath = path.join(tempFilesDir, 'domains.json');
    const domains = JSON.parse(await fs.readFile(domainsFilePath));
    domains.forEach(domain => {
        const map = mapping.find(m => m.oldUUID === domain.communityId);
        if (map) {
            domain.communityId = map.newUUID;
        }
    });
    await fs.writeFile(domainsFilePath, JSON.stringify(domains, null, 4));

    const domainsMappingFilePath = path.join(tempFilesDir, 'domainsMappings.json');
    const domainsMapping = JSON.parse(await fs.readFile(domainsMappingFilePath));

    const assetsFilePath = path.join(targetConfig.backupDir, 'assets.json');
    const assets = JSON.parse(await fs.readFile(assetsFilePath));
    assets.forEach(asset => {
        const map = domainsMapping.find(m => m.oldUUID === asset.domainId);
        if (map) {
            asset.domainId = map.newUUID;
        }
    });
    const newAssetsFilePath = path.join(tempFilesDir, 'assets.json');
    await fs.writeFile(newAssetsFilePath, JSON.stringify(assets, null, 4));
}

module.exports = fixUUIDs;