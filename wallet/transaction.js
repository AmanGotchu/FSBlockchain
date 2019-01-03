const uuid = require('uuid/v1');

class Transaction {
    constructor({ senderWallet, recipient, amount }) {
        this.id = uuid();
        this.outputMap = this.createOutputMap({ senderWallet, recipient, amount });
        this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
    }
    
    createOutputMap({ senderWallet, recipient, amount }){
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }

    createInput({ senderWallet, outputMap }){
        const input = {};
        input['timestamp'] = Date.now();
        input['amount'] = senderWallet.balance;
        input['address'] = senderWallet.publicKey;
        input['signature'] = senderWallet.sign(outputMap);
        return input;
    }
}

module.exports = Transaction;