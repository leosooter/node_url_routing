var http = require('http');
var static_contents = require('./static_contents');
var server = http.createServer(function(request, response){
  static_contents(request, response);
});

server.listen(8000);
