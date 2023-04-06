const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
http.createServer(function (request, response) {   
    response.end('Birthdate:21-April-1996'); 
}).listen(port,hostname); 
 
