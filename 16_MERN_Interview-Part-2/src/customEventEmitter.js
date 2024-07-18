/**
   EmitEmitter class:

     - In nodeJS, an EvenEmitter class is a special type of a class available that allows
     objects to communication with each other by emitting an event and listening them.

     - Emitting events: an object of evenet emitter will be creating then can send out that event. These events are identified  by a name ('clcik', 'data', 'error') but you can also create the custom events as per your requirement.


     - Listening the events: you have listen the events. 
 */

 /**
    How to create the custom events?
  */

  const EventEmitter = require('events');

  const eventEmiiter = new EventEmitter();

  // listening this 'myEvent'

  eventEmiiter.on('myEvent', (...args)=>{

    console.log('There is new event triggered!', args);

  });

   eventEmiiter.on('myEvent', (...args)=>{

    console.log('There is new event triggered!', args);
    console.log('------------')

  });


  //Emitting the events
  eventEmiiter.emit('myEvent');

  eventEmiiter.emit('myEvent', 1,2,3);

   eventEmiiter.emit('myEvent', [1,2,3]);