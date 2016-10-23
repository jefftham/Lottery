//create server

//var https = require('https');
//var http = require('http');
var express = require('./Packages/router');
var app = express();
var url = require('url');
var WebSocketServer = require('ws').Server;
var createServer = require("auto-sni");

/** @todo  please change it to your email address */
var email = 'Jeff.Tham@email.com';

/** @todo  please change it to your domain name */
var domainList = ["www.yeadev.com", "yeadev.com"];


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

/*  update: i checked with the author of "auto-sni", new cert only be generated after 80 days of the existing cert creation date.

if (app.get('env') === 'development') {
    isDebug = true;
}

console.log("isDebug is ",isDebug);

*/



//create web (https) server with cert. 
//make use of  letsencrypt.org
var server = createServer({
      email: email, // Emailed when certificates expire.
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


var WebsocketManager = require('./Packages/websocket_manager.js')

var wm = new WebsocketManager(function(){}, {server:server});

