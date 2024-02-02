// need to serve a html string via nodejs server.
const http = require('http');

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'application/json');

    const jsonData = {
        message: "Hello world",
        data: new Date()
    };

    const jsonResponse = JSON.stringify(jsonData);

    res.write(jsonResponse);

    res.end();
});

const port = 4000;
const hostName = '127.0.0.1';
server.listen(port, hostName, ()=>{
   console.log(`Server is starting on http://${hostName}:${port}`);
})

