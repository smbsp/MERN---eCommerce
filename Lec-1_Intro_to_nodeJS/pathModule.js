/**
 *   path module
 * 
 *    path.join([...paths]);
 *    path.resolve([...paths]);
 *    path.normalise(path);// normalise the path from '..' to '.'
 * 
 * 
 */
// const path = require('path');

// path.normalize();

// For your reference point view

/**
 * 1. path.join([...paths]): 
 
    -> This method joins multiple path segments into a single path string, taking care of platform-specific path separators 
        (e.g., backslashes on Windows and forward slashes on Unix-like systems).

        const path = require('path');
        const fullPath = path.join('folder', 'subfolder', 'file.txt');

2. path.resolve([...paths]): 

    -> Resolves an absolute path from multiple path segments, starting from the root directory. It can be helpful for creating absolute 
        paths based on relative ones.

       const path = require('path');
       const absolutePath = path.resolve('folder', 'subfolder', 'file.txt');

3. path.dirname(path): 

     -> Returns the directory name of a path.

         const path = require('path');
         const dirName = path.dirname('/path/to/file.txt');

 4. path.extname(path): 
    
    -> Returns the file extension of a path, including the dot.

        const path = require('path');
        const extension = path.extname('/path/to/file.txt');

5. path.normalize(path): 
 
    -> Normalizes a path by resolving '..' and '.' segments and converting slashes to the appropriate platform format.

        const path = require('path');
        const normalizedPath = path.normalize('/path/to/../file.txt');

6. path.isAbsolute(path): 
 
    -> Checks if a path is an absolute path.

        const path = require('path');
        const isAbsolute = path.isAbsolute('/path/to/file.txt');

7. path.relative(from, to): 
    
    -> Returns the relative path from one path to another.

    const path = require('path');
    const relativePath = path.relative('/path/from', '/path/to');
 */




