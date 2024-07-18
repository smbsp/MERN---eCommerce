const net = require('net');

// Configuration for the local service you want to expose
const localPort = 3000;  // Port where your local server is running
const localHost = '127.0.0.1';  // Localhost

// Configuration for the public facing proxy
const proxyPort = 8080;  // Public port on which the proxy will listen

// Create a server that listens on the proxyPort
const server = net.createServer((proxySocket) => {
    console.log('Client connected to proxy');

    // Create a connection to the local server
    const serviceSocket = new net.Socket();
    serviceSocket.connect(localPort, localHost, () => {
        console.log('Proxy connected to local server');
    });

    // When data is received from the client, forward it to the local server
    proxySocket.on('data', (data) => {
        console.log('Data received from client:', data.toString());
        serviceSocket.write(data);
    });

    // When data is received from the local server, send it back to the client
    serviceSocket.on('data', (data) => {
        console.log('Data received from local server:', data.toString());
        proxySocket.write(data);
    });

    // Handle socket closing
    proxySocket.on('close', () => {
        console.log('Client disconnected');
        serviceSocket.end();
    });

    serviceSocket.on('close', () => {
        console.log('Local server connection closed');
        proxySocket.end();
    });
});

// Start the proxy server
server.listen(proxyPort, () => {
    console.log(`Proxy server running on port ${proxyPort}`);
});
