const Block = require('./block');
const cryptoHash = require('./crypto-hash');
class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length-1],
      data
    })
    this.chain.push(newBlock);
  }

  static isValidChain(testChain) {

    if(JSON.stringify(testChain[0]) !== JSON.stringify(Block.genesis())){
      return false;
    }

    for(let i = 1; i<testChain.length; i++){
      const { timestamp, lastHash, hash, data } = testChain[i];
      const actualLastHash = testChain[i-1].hash;

      if (lastHash !== actualLastHash){
        return false;
      }
      
      const validatedHash = cryptoHash(timestamp, lastHash, data);
      if(hash !== validatedHash){
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;