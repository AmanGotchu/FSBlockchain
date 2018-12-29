const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('./config.js');
const cryptoHash = require('./crypto-hash');

class Block {
  constructor({ timestamp, lastHash, nonce, difficulty, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.hash = hash;
    this.data = data;
  }

  static genesis(){
    return new Block(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }){

    const lastHash = lastBlock.hash;
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do{
      nonce++;
      timestamp = Date.now();
      difficulty = this.adjustDifficulty({
        originalBlock: lastBlock,
        newtime: timestamp
      });
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    }while(hexToBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty));

    return new Block({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash
    });
  }

  static adjustDifficulty({ originalBlock, newtime }){
    const { timestamp, difficulty } = originalBlock;

    if(difficulty < 1){
      return 1;
    }

    if(newtime - timestamp > MINE_RATE){
      return difficulty - 1;
    }
    
    return difficulty + 1;
  }
}

module.exports = Block;
