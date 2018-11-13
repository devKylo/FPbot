var http = require('http');
var url = require('url');
var fs = require('fs');
var website;
var server = http.createServer(function(request, response) {
  console.log("WEBSERVER ONLINE")
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.write("                          _                 _     _       _ _      _            _                     \n                         | |               | |   | |     ( ) |    | |          | |                    \n _   _  ___  _   _    ___| |__   ___  _   _| | __| |_ __ |/| |_   | |__   ___  | |__   ___ _ __ ___   \n| | | |/ _ \\| | | |  / __| '_ \\ / _ \\| | | | |/ _` | '_ \\  | __|  | '_ \\ / _ \\ | '_ \\ / _ \\ '__/ _ \\  \n| |_| | (_) | |_| |  \\__ \\ | | | (_) | |_| | | (_| | | | | | |_   | |_) |  __/ | | | |  __/ | |  __/_ \n \\__, |\\___/ \\__,_|  |___/_| |_|\\___/ \\__,_|_|\\__,_|_| |_|  \\__|  |_.__/ \\___| |_| |_|\\___|_|  \\___(_)\n  __/ |                                                                                              \n |___/                                                                                               \n\nHello, welcome to my website. This is a PRIVATE DOMAIN and shouldn't be browsed freely. Move along.");
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
