var http = require('http');
var url = require('url');
var fs = require('fs');
var website;
console.log("WEBSERVER ONLINE")
var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            fs.readFile(__dirname + "/website/index.html", function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/memberCount':
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            var membercount = furryParadise.getMemberCount().toString()
            response.write(membercount);
            response.end();
            break;
        case '/macarena':
            fs.readFile(__dirname + "/index.html", function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
        //404 error page
            response.writeHead(404);
            response.write("404");
            response.end();
            break;
    }
});
server.listen(3003);
