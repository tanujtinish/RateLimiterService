const ethers = require("ethers");

const gethCheckpointfullNode = "http://54.242.200.67:8545"
let gethCheckpointNodeProvider = new ethers.providers.JsonRpcProvider(
    gethCheckpointfullNode
);

const gethFullNode = "http://54.234.253.208:8545"
let gethFullNodeProvider = new ethers.providers.JsonRpcProvider(
    gethFullNode
);

const gethArchiveNode = "http://34.235.130.239:8545"
let gethArchiveNodeProvider = new ethers.providers.JsonRpcProvider(
    gethArchiveNode
);

const erigonArchiveNode = "http://34.235.130.239:8545"
let erigonArchiveNodeProvider = new ethers.providers.JsonRpcProvider(
    erigonArchiveNode
);

module.exports = {
    gethCheckpointNodeProvider,
    gethFullNodeProvider,
    gethArchiveNodeProvider,
    erigonArchiveNodeProvider
};
