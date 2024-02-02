// need to serve a html string via nodejs server.
const http = require('http');

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    // console.log(' I am inside the server method');

    const htmlTemplate =`
       <html>
         <head>
            <title>Serving HTML on the browser via nodeJS</title>
         </head>
         <body>
            <h1>Hello we are in nodeJS world!</h1>
         </body>
       </html>
    `;

    res.write(htmlTemplate);

    res.end();
});

const port = 3030;
const hostName = '127.0.0.1';
server.listen(port, hostName, ()=>{
   console.log(`Server is starting on http://${hostName}:${port}`);
})

