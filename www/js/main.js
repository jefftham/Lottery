
var ws = new WebSocket('wss://'+location.hostname);
 
ws.onopen = function(event) {
  ws.send('something from browser');
};
 
ws.onmessage = function(event) {
  // flags.binary will be set if a binary data is received. 
  // flags.masked will be set if the data was masked. 
  console.log(event.data);
};


$(document).ready(function() {


});

