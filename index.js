var server = require('./server');
var router  = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {}; // verb

//Handler functions
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

console.log('Index.js :)');
// Implementing DI for having loousy classes, 
// non-blocking asynchronous functions and future scalability :)
server.start(router.route, handle);