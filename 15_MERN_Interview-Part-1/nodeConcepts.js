// console.log(global);

// console.log('dir name -> ', __dirname, "file name", __filename);


// console.log(process);
// a global object that provides information about the current nodejs process. It is one of the core modules and is available without need to import it via require.

// console.log(process.env); // it helps you to access the key values pairs of the .env file.


/**

   NativeModule
    Definition: A NativeModule in Node.js is a built-in module written in C/C++ and embedded directly in the Node.js binary.
    Purpose: Provides core functionalities efficiently through the V8 engine, such as fs, http, and others.
    Usage: JavaScript code can directly require these modules since they are built into Node.js itself.


   Internal Binding
    Definition: Internal bindings are C/C++ code bindings within Node.js that expose low-level system functionalities to JavaScript.
    Purpose: Provide a bridge between native code and JavaScript, enabling the implementation of Node.js’s built-in modules.
    Usage: JavaScript modules use these internal bindings to access low-level features like file systems, networking, and more.

 */

// console.log(process.cwd());

//Command line arguments : process.argv -> returns an array containing the command line arguments passed when the nodeJS process is launced.

// console.log(process.argv); // ['path/to/node', 'path/to/app.js', arg1, arg2]

// console.log(process.pid);// returns you the process id

// console.log(process.stdin, process.stdout, process.stderr);





