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

//  Project: video streaming server

// Resources Utilized
// CPU: Handles the HTTP server logic, parses range headers, and manages the data transfer.
// Memory (RAM): Holds data streams for the video in chunks, plus metadata for each request.
// Disk I/O: Reads the video file in chunks using file streams.
// Network: Transfers data between the server and the client via HTTP.

// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const videoFilePath = path.join(__dirname, 'movie.mp4');

http.createServer((req, res) => {
  if (req.url === '/video') {
    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res.writeHead(416, { 'Content-Range': `bytes */${fileSize}` });
        return res.end();
      }

      const chunkSize = (end - start) + 1;
      const file = fs.createReadStream(videoFilePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(videoFilePath).pipe(res);
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
            <html>
            <body>
                <video width="800" controls>
                    <source src="/video" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </body>
            </html>
        `);
  }
}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));