const {
  gethCheckpointNodeProvider,
} = require("etheriumNodeConfig");
const {
  RateLimitedService,
} = require("RateLimiter");

const ethers = require("ethers");

class EtheriumService extends RateLimitedService {
  constructor(minTime, maxConcurrent) {
    if (minTime === undefined) {
      // Default behavior when no parameters are provided
      super();
    } else if (param2 === undefined) {
      // Constructor with a single parameter
      super(minTime, null);
    } else {
      // Constructor with both parameters
      super(minTime, maxConcurrent);
    }
    this.provider = gethCheckpointNodeProvider;
  }

  async getLatestBlockNumber() {
    const blockNumber = await this.provider.getBlockNumber();
    // console.log("Current Block Number:", blockNumber);
    return blockNumber;
  }

  async fetchLogs(startBlock, numBlocks, topics) {
    try {
      const logs = await this.provider.getLogs({
        fromBlock: startBlock,
        toBlock: startBlock + numBlocks,
        topics: [topics],
      });
      return logs;
    } catch (error) {
      // console.log("Error while fetching Logs: ", e)
      throw new Error("Error fetching Logs: " + error.message);
    }
  }

  fetchLogsRateLimited(startBlock, numBlocks, topics) {
    return this.limiterInstance.schedule(() =>
      this.fetchLogs(startBlock, numBlocks, topics)
    );
  }

  async fetchBlocks(startBlock, numBlocks) {
    try {
      const blockPromises = [];
      for (
        let blockNumber = startBlock;
        blockNumber < startBlock + numBlocks;
        blockNumber++
      ) {
        blockPromises.push(this.provider.getBlock(blockNumber));
      }

      const blocks = await Promise.all(blockPromises);
      return blocks;
    } catch (error) {
      // console.log("Error fetching Transaction Hashes: ", e)
      throw new Error("Error fetching Blocks: " + error.message);
    }
  }

  async fetchTransactionHashes(startBlock, numBlocks) {
    try {
      const blocks = await this.fetchBlocks(startBlock, numBlocks);
      const txHashes = blocks.map((block) => block.transactions).flat();
      return txHashes;
    } catch (error) {
      // console.log("Error fetching Transaction Hashes: ", e)
      throw new Error("Error fetching Transaction Hashes: " + error.message);
    }
  }

  async fetchTransactionReceipts(startBlock, numBlocks) {
    try {
      const txHashes = await this.fetchTransactionHashes(startBlock, numBlocks);
      const receiptPromises = txHashes.map((txHash) =>
        this.provider.getTransactionReceipt(txHash)
      );
      const receipts = await Promise.all(receiptPromises);

      return receipts;
    } catch (error) {
      // console.log("Error fetching Transaction Receipts: ", e)
      throw new Error("Error fetching Transaction Receipts: " + error.message);
    }
  }

  fetchSmartContract(smart_contract_address, smart_contract_abi) {
    return new ethers.Contract(
      smart_contract_address,
      smart_contract_abi,
      this.provider
    );
  }
}

module.exports = { EtheriumService };
