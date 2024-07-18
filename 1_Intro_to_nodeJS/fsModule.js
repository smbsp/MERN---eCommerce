/**
 *  fs module
 *    How to read the content of the file?
 */

const fs = require('fs'); // CJS(common JS) -> earlier with nodeJSv12.X.X

// import fs from 'fs';// ESM (ECMAScript Module) -> after nodeJSv12/13+

// fs.readFileSync()

// fs.readFile('f1.txt', 'utf-8', (err, data)=>{
//    if(err) {
//     console.error(err);
//     return;
//    }

//    console.log(data);
// });

/**
 * How to write content inside the file?
 */

const content = 'Hello Ashwani, How are you?';

fs.writeFile('f2.txt', content, 'utf-8', (err)=>{
   if(err){
      console.error(err);
      return;
   }

   console.log('Content has been updated sucessfully');
});

fs.readFile('f2.txt', 'utf-8', (err, data)=>{
   if(err) {
    console.error(err);
    return;
   }
   console.log(data);

   return data;
});

// HW - rename or deleting a file.
// fs.rename()
// fs.unlink()

const dirName = 'my-files'

fs.mkdir(dirName, {recursive: true}, (err)=>{

   if(err) {
      console.log(err);
      return;
   }

   console.log(`Directory - ${dirName} has been created!! `);

})


fs.rmdir(dirName, {recursive: true}, (err)=>{

   if(err) {
      console.log(err);
      return;
   }

   console.log(`Directory - ${dirName} has been deleted!! `);

});


