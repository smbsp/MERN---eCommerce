 /***
     Streams: it allows data to be processsed in small chunks, provide one piece of data at a time without need to load the entire data into memory.
 
     Streams make use of zlib:
       zlib is library that os being oftenly used for managing the data efficiently particularly in the network communication and file management.

     types of streams: we have 4 types of streams
       1. read - fs.createReadStream(filepath)
       2. write - fs.createWriteStream(filepath)
       3. dublex - sockets
       4. Transformative - change one output to another output -> zlib, crypto

     Streams use the "EventEmitter" as a base class


    pipe(): is a method on readable stream and is used to connect a readable stream to wriable stram.

  */


  /*
     Project: video streaming server

          1. same concepts will be using while implementing video streaming server.

          2. take a movie file.

          3. read as stream and pipe the response.

          4. on the client side, try using html5 video tag to read the movie file content. 
  */