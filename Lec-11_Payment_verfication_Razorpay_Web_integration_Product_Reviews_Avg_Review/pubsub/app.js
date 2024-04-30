// How It Works
// PubSub Class: This class encapsulates the EventEmitter functionality. It provides methods for subscribing to a topic, unsubscribing from a topic, 
// and publishing messages to a topic.
// Subscribers: Functions subscriber1 and subscriber2 are defined to handle messages. They can be subscribed to any number of topics.
// Publishing Messages: Messages are sent to topics using the publish method. All subscribers to that topic will receive the messages.

const PubSub = require('./pubsub');

// Create an instance of PubSub
const pubsub = new PubSub();

// Subscriber functions
function subscriber1(message) {
    console.log(`Subscriber 1 received: ${message}`);
}

function subscriber2(message) {
    console.log(`Subscriber 2 received: ${message}`);
}

// Subscribe to topics
pubsub.subscribe('news', subscriber1);
pubsub.subscribe('news', subscriber2);
pubsub.subscribe('weather', subscriber1);

// Publish messages
pubsub.publish('news', 'Hello! This is the latest news.');
pubsub.publish('weather', 'Today’s weather is sunny.');

// Unsubscribe from a topic
pubsub.unsubscribe('news', subscriber2);

// Publish another message
pubsub.publish('news', 'Second news item after unsubscribing one listener.');
