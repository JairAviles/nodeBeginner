var http = require('http');
var url  = require('url');
var port = 8888;

// function start() {
// 	http.createServer(function(request, response) {
// 		console.log("Request received."); 
// 		response.writeHead(200, {"Content-Type": "text/plain"});
// 		response.write("[HTTP] === Hello World ===");
// 		response.end();
// 	}).listen(port);

// 	console.log('Server running on port ' + 
// 		 port + '.');
// }

 function start(route, handle) {
	function onRequest(request, response) { 
		var pathname = url.parse(request.url).pathname;

		//Discard request for handling '/favicon.ico' item
		if(pathname.indexOf('/favicon.ico') === -1) {
			console.log('Request for ' + pathname + ' received.');
			route(handle, pathname, response, request);
		}
	}
	http.createServer(onRequest).listen(8888); 
		console.log("Server has started.");
}

exports.start = start;