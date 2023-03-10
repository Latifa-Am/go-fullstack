const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Hi resp from the server!');
});
server.listen(process.env.port || 3000);