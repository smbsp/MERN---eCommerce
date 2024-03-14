// OS module:

// const os = require('os');

// console.log(os.arch());
// console.log(os.cpus());
// console.log(os.networkInterfaces());

const path = require('path');

console.log(__dirname);


const basePath = path.basename(__dirname);

console.log(basePath);

const newPath = path.join(__dirname, 'public', 'wsClient', 'wsClient.js');

console.log(newPath)

// fs module - to access the file and read and write the content from the files. (Please refer lec-1 and 2)

/**

  Project:1

    scan the files from the download folder and catergorise them as compressed folder ->  zip,7zip files, and documents -> txt, xls, pdf

    1. download such files 
    2. create compress folder and documents
    3. scan and read the files from download folder and categorise into compress and documents.
    fs.readdir
 */

 /***
     Streams: it allows data to be processsed in small chunks, one piece at a time without need to load the entire data into memory.
 
     Streams make us eof zlib:
       zlib is library that os being oftenly used for managing the data efficiently particularly in the network communication and file management.

     types of streams: we have 4 types of streams
       1. read
       2. write
       3. dublex - sockets
       4. Transformative - change one output to anothet output -> zlib, crypto

     Streams use the "EventEmitter" as a base class

     stream docs: https://nodejs.org/api/stream.html
  */
 