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
		// console.log("Request received."); 
		// console.log('request.url: ' + request.url);
		// var postData = "";
		var pathname = url.parse(request.url).pathname;

		//Discard request for handling '/favicon.ico' item
		if(pathname.indexOf('/favicon.ico') === -1) {
			console.log('Request for ' + pathname + ' received.');
			route(handle, pathname, response, request);
			// var content = route(handle, pathname);
			// response.writeHead(200, {"Content-Type": "text/plain"});
			// response.write("[HTTP] === Hello World ===");
			// response.write(content);
	  		// response.end();
	  		// request.setEncoding('utf8');
	  		//listeners call backs that handle the bulk of data by chunks
	  		// The following event occur when there is data to handle
	  		// request.addListener('data', function(postDataChunk){
	  		// 	postData += postDataChunk;
	  		// 	console.log("Recieved POST data chunk '" +
	  		// 		 postDataChunk +
	  		// 		 "' .");
	  		// });
	  		//The following event occur when the whole data has been handled
	  		// request.addListener("end", function(){
	  		// 	route(handle, pathname, response, postData);
	  		// });
		}
	}
	http.createServer(onRequest).listen(8888); 
		console.log("Server has started.");
}

exports.start = start;