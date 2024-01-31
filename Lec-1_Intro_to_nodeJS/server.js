/**
 *  http module
 * 
 */

const http = require('http');

const server = http.createServer((req, res)=>{

    res.setHeader('Content-Type', 'text/plain');

    res.write('Hello, Welcome in node JS HTTP module!!');

    res.end();
});

const port = 7000;
const host = 'localhost' // http://localhost:7000

server.listen(port, host, ()=>{
    console.log(`Server is listening  on  http://${host}:${port}`);
})
