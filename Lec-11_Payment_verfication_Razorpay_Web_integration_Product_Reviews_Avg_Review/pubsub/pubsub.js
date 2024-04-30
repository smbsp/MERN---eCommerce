const EventEmitter = require('events');

class PubSub {
    constructor() {
        this.emitter = new EventEmitter();
    }

    // Subscribe to a topic
    subscribe(topic, listener) {
        this.emitter.on(topic, listener);
    }

    // Unsubscribe from a topic
    unsubscribe(topic, listener) {
        this.emitter.removeListener(topic, listener);
    }

    // Publish a message to a topic
    publish(topic, message) {
        this.emitter.emit(topic, message);
    }
}

module.exports = PubSub;
