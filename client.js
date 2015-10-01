<!DOCTYPE html>
<html lang="en">
<head>
	<title>Sapient Conversations</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://bit.ly/cdn-bootstrap-css">
	<link rel="stylesheet" href="http://bit.ly/cdn-bootstrap-theme">
	<script src="http://bit.ly/cdn-bootstrap-jq"></script>

	<script>
		
	    var ws = new WebSocket("ws://localhost:8000");
	    var nickname = "sapent-bot";
	    ws.onopen = function(e) {
		console.log('Connection to server opened');
	    }

	    function appendLog(type, nickname, message) {
		var messages = document.getElementById('message');
		var messageElem = document.createElement("li");
		var preface_label;
		if(type === 'notification') {
		   preface_label = "<span class=\"label label-info\">*</span>";
		} else if(type === 'nick_update') {
		   preface_label = "<span class=\"label label-warning\">*</span>";
		} else {
		   preface_label = "<span class=\label label-success\">*</span>"
		   + nickname + "</span>";
		}
		var message_text = "<h2>" + preface_label + "&nbsp; &nbsp;"
		+ message + "</h2>";
		messageElem.innerHTML = message_text;
		message.appendChild(messageElem);
	    }

	   ws.onmessage = function(e) {
		var data = JSON.parse(e.data); 
		nickname = data.nickname;
		appendLog(data.type, data.nickname, data.message);
		console.log("ID: [%s] = %s", data.id, data.message);
	    }

	   ws.onclose = function(e) {
		appendLog("Connection closed");
		console.log("Connection closed");
	   }

	   function sendMessage() {
		var messageField = document.getElementById('message');
		if(ws.readyState === WebSocket.OPEN) {
			ws.send(messageField.value);
		}
		messageField.value = '';
		messageField.focus();
	   }

           function disconnect() {
		ws.close();
	   }
        </script>
</head>

<body lang="en">
	<div class="vertical-center">
	<div class="container">
	<ul id="message" class="list-unstyled">
	
	</ul>
	<hr/>
	<form role="form" id="chat_form" onsubmit="sendMessage(); return false;">
		<div class="form-group">
		<input class="form-control" type="text" id="message" nam"message"
		placeholder="Type your text here" value="" autofocus/>
		</div>
	<button type="button" id="send" class="btn btn-primary" onclick="sendMessage();">Send Message</button>
	</form>
	</div><!-- end of vertial -->
	</div><!-- end container -->
  <script src="http://bit.ly/cdn-bootstrap-minijs"></script>
</body>
</html> 
