const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-4c9b38c3-6637-45b7-89d5-51ff271a38ef',
    subscribeKey: 'sub-c-efd0b676-0bcb-11e9-bfa2-22713b88d5b7',
    secretKey: 'sec-c-ZDlkMWFlMDEtODI5MS00ZjVlLTk3MjAtZGE3ZjdhNDZjN2Vl'
};

const CHANNELS = {
    TEST: 'TEST'
};

class PubNubClass {
    constructor() {
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        
        this.pubnub.addListener(this.listener());
    }

    listener() {
        return {
            message: messageObject => {
                const { channel, message } = messageObject;

                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
            }
        }
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }
}

const testPubNub = new PubNubClass();
testPubNub.publish({ channel: CHANNELS.TEST, message: 'hello pubnub' });

module.exports = PubNubClass;