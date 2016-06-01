//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8848; 

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

var dispatcher = require('httpdispatcher');

//Lets use our dispatcher
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
        response.end('It does not Works!! Path Hit: ' + request.url);
    }
}

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

//A sample GET request    
dispatcher.onGet("/", function(req, res) {
    console.log(req);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});  

//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});    

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

//> npm install httpdispatcher
//> node myFirstHTTPServer.js
//GET /page1 => 'Page One'
//POST /page2 => 'Page Two'
//GET /page3 => 404
//GET /resources/images-that-exists.png => Image resource
//GET /resources/images-that-does-not-exists.png => 404
