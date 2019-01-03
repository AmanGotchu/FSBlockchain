class Transaction {
    constructor({ senderWallet, recipient, amount }) {
        this.senderWallet = senderWallet;
        this.recipient = recipient;
        this.amount = amount;

        this.id = 10;
        this.outputMap = {};
        this.outputMap[recipient] = amount;
        this.outputMap[senderWallet.publicKey] = senderWallet.balance-amount;
    }
}

module.exports = Transaction;