const nodeStatic = require('node-static');

const fileServer = new nodeStatic.Server('./public');

require('http').createServer(function(request, response) {
    request.addListener('end', () => fileServer.serve(request, response)).resume();
}).listen(8080);
