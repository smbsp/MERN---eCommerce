// console.log(global);

// console.log('dir name -> ', __dirname, "file name", __filename);


console.log(process);
// a global object that provides information about the current nodejs process. It is one of the core modules and is available without need to import it via require.

// console.log(process.env); // it helps you to access the key values pairs of the .env file.


/**

   Native module:
    refers to the modules written in JS but are the part of the nodeJS core.


   Internal binding:
     are modules refer to the internal C++ bindings that are used by nodeJS.

 */

console.log(process.cwd());

//Command line arguments : process.argv -> returns an array containing the command line arguments passed when the nodeJS process is launced.

console.log(process.argv); // ['path/to/node', 'path/to/app.js', arg1, arg2]

console.log(process.pid);// returns you the process id

console.log(process.stdin, process.stdout, process.stderr);





