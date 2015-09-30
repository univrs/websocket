var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server,
	wss = new WebSocketServer({port:8000});
var uuid = require('node-uuid');

var clients = [];

function wsSend(type, client_uuid, nickname, message){
	for( var i=0; i<clients.length; i++) {
		var clientSocket = clients[i].ws;
		if(clientSocket.readyState === WebSocket.OPEN) {
		   clientSocket.send(JSON.stringfy({
			"type": type;
			"id"  : client_uuid;
			"nickname": nickname;
			"message": message
		   }));
		}
	}
} // end of func wsSend

var clientIndex = 1;

wss.on('connect', function(ws) {
	var client_uuid = uuid.v4();
	var nickname = "AnonymousUser"+clientIndex;
	clientIndex+=1;
	clients.push({"id": client_uuid, "ws": ws, "nickname": nickname});
	console.log('client [%s] connected', client_uuid);

	var connect_message = nickname + " has connected";
	wsSend("notification", client_uuid, nickname, connect_message);
        
        ws.on('message', function(message) {
		if(message.indexOf('/nick') === 0) {
		   var nickname_array = message.split(' ');    

});

