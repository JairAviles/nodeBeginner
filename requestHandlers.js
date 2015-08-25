// var exec = require('child_process').exec;
var querystring = require('querystring'),
	fs = require('fs'),
	formidable = require('formidable');

function start(response) {
	console.log("Request handler 'start' was called.");
	// var body =  '<html>'+
	// 			'<head>'+
	// 			'<meta http-equiv="Content-Type" content="text/html; '+
	// 			'charset=UTF-8" />'+
	// 			'</head>'+
	// 			'<body>'+
	// 			'<form action="/upload" method="post">'+
	// 			'<textarea name="text" rows="20" cols="60"></textarea>'+
	// 			'<input type="submit" value="Submit text" />'+
	// 			'</form>'+
	// 			'</body>'+
	// 			'</html>';
var body =  '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" '+
			'content="text/html; charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<form action="/upload" enctype="multipart/form-data" '+
			'method="post">'+
			'<input type="file" name="upload">'+
			'<input type="submit" value="Upload file" />'+
			'</form>'+
			'</body>'+
			'</html>';

	// function sleep(milliSeconds) {
	// var startTime = new Date().getTime();
	// while (new Date().getTime() < startTime + milliSeconds);
	// }
	// sleep(10000);
	// return "Hello Start";
	// var content = "empty";
	// exec("ls -lah", function (error, stdout, stderr) { 
	// 	content = stdout;
	// });
	// return content;
	// exec("find /",
	// 	{ timeout: 10000, maxbuffer: 20000*1024 }, 
	// 	function(error, stdout, stderr){
	// 	response.writeHead(200, {"Content-Type": "text/plain"});
	// 	response.write(stdout);
	// 	response.end();
	// });
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

// function upload(response, postData) {
function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("About to parse");
	form.parse(request, function(error, fields, files) {
		console.log("Parsing done...");	
		/* Possible error on Windows systems:
		tried to rename to an already existing file */
		console.log(files);
		console.log(files.upload.path);
		//fs.rename(files.upload.path, "/tmp/test.png", function(error) {
		fs.rename(files.upload.path, "/tmp/test.png", function(error) {	
			if (error) {
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
	// response.writeHead(200, {"Content-Type": "text/plain"});
	//response.write("Hello Upload");
	// response.write("You've sent the text: " +
	// querystring.parse(postData).text);
	// response.end();
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type":"image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;