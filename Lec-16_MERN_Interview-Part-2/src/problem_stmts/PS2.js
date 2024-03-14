/**

   PS2: There are certain tasks that are CPU intensive such as image processing , video encoding etc

   we will taking an exmaple of fibonacci computation

   Solution: Child process


   Child process: In nodeJS a child process allows you to perform the operation as a separate process which will be useful for performing the CPU intensive tasks.

   with a child process you 4 things:

   1. exec -> you can run any shell command no communication required.
   2. execFile -> you can run any compiled file: eg: windows: exe
   3. spawn -> generally used to run the different programs whenever there alot interaction or communication is required.
   4. fork: light way to create a copy of a process (cpu intensice task).

   reference: https://nodejs.org/api/child_process.html
        
              https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/



 */
