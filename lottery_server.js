//create server

//var https = require('https');
//var http = require('http');
var express = require('./Packages/router');
var app = express();
var url = require('url');
var WebSocketServer = require('ws').Server;
var createServer = require("auto-sni");


/**
 * letsencrypt contains rate limit, after hitting the limit, letsencrypt will not generate or return the valid key-cert.
 * if the server is not in production mode, isDebug is always set to true to prevent hitting letsencrypt limit.
 * only one method to run node.js in development mode, other method to run node.js will treat as in production mode.
 * eg. node lottery_server.js                        //isDebug = false
 * eg. NODE_ENV="development" node lottery_server.js  //isDebug = true
 * @type {Boolean}
 * @see {@link  https://letsencrypt.org/docs/rate-limits/}
 */
var isDebug = false;

if (app.get('env') === 'development') {
    isDebug = true;
}

console.log("isDebug is ",isDebug);

//yeadev.com is my test domain, you should change it to you own domain.
var domainList = ["www.yeadev.com", "yeadev.com"];


//create web (https) server with cert. 
//make use of  letsencrypt.org
var server = createServer({
      email: 'Jeff.Tham@email.com', // Emailed when certificates expire.
      agreeTos: true, // Required for letsencrypt.
      debug: isDebug, // Add console messages and uses staging LetsEncrypt server. (Disable in production)
      domains: domainList, // List of accepted domain names. (You can use nested arrays to register bundles with LE).
      forceSSL: true, // Make this false to disable auto http->https redirects (default true).
      redirectCode: 301, // If forceSSL is true, decide if redirect should be 301 (permanent) or 302 (temporary). Defaults to 302
      ports: {
          http: 80, // Optionally override the default http port.
          https: 443 // // Optionally override the default https port.
      }
  },app
);

server.once("listening", function() {
    console.log('HTTPS server is running.' );
    console.log("default key-cert location:  /root/letsencrypt/etc/live/");
});


var wss = new WebSocketServer({ server: server });

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions 
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
 
  ws.on('message', function incoming(message) {
    console.log(message);
  });
 
  ws.send('something from server');
});
 
//define the broadcast function for websocket
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.broadcast("broadcast message")
