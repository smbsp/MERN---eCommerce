const EventEmitter = require('events');
class EventManager extends EventEmitter { }

// Create an instance of the event manager
const eventManager = new EventManager();

// Export the event manager so other modules can use it
module.exports = eventManager;
