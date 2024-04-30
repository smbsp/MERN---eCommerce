const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Received request on local server');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from the local server!');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Local server running on http://localhost:${port}`);
});
