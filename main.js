 const SHA256 = require('crypto-js/sha256')
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0,"20/04/2022", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if (currentBlock.hash != currentBlock.calculateHash() || currentBlock.previousHash != previousBlock.hash) return false;
        } 
        return true;
    }
}
let santiCoin = new BlockChain();
santiCoin.addBlock(new Block(1, "20/04/2022", {amount: 4}));
santiCoin.addBlock(new Block(2, "20/04/2022", {amount: 10}));

console.log("Is blockchain valid? " + santiCoin.isChainValid());

santiCoin.chain[1].data = {amount : 100};
santiCoin.chain[1].hash = santiCoin.chain[1].calculateHash();

console.log("Is blockchain valid? " + santiCoin.isChainValid());
//console.log(JSON.stringify(santiCoin, null, 4));