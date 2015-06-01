/*
Webrtc 2-person chat with simple signalling 
Made by Aman Singh
*/

navigator.getWebcam=( navigator.getUserMedia||
					  navigator.webkitGetUserMedia||
					  navigator.mozGetUserMedia||
					  navigator.msGetUserMedia);

var peer= new Peer({key: 'ju5f1u82lnzbbj4i' ,
					debug: 3,
					config: {'iceServers':[
					{url: 'stun:stun.l.google.com:19302'},
					{url: 'stun:stun1.l.google.com:19302'},
					{url: 'turn:numb.viagenie.ca',username:'amanterry2000@yahoo.com',credential:'zaqxsw'}
					]}});


//On open , Set the peer id
peer.on('open',function() {
	$('#my-id').text(peer.id);
})

//Answer automatically

peer.on('call', function(call) {
	// Answer automatically for demo
	call.answer(window.localStream);
	step3(call);
});
//Click Handlers Setup
$(function() {

$('#make-call').click(function() {
	//Initiate a call
	var call=peer.call($('callto-id').val(),window.localStream);
	step3(call);
});

//End-Call

$('#end-call').click(function() {
	window.existingCall.close();
	step2();
});

//Retry if getUserMedia fails
$('#step1-retry').click(function() {
	$('#step1-error').hide();
	step();
});

step1();
});

function step1() {
	//get audio/video stream
	navigator.getWebcam({audio: false , video : true},function(stream){
		//Display the stream in the video object
		$('#my-video').prop('src',URL.createObjectURL(stream));
		window.localStream=stream;
		step2();
	},function() {$('#step1-error').show();})
}

function step2() {
	//Adjust the UI
	$('#step1','#step2').hide();
	$('#step2').show();
}


function step3(call)
{//Hang up on existing call if present
if(window.existingCall)
	window.existingCall.close();

}

//Wait for the streamon Call, the setup peer video
call.on('stream',function(stream) {
	$('#their-video').prop('src',URL.createObjectURL(stream));
});
$('#step1','#step2').hide();
$('#step3').show();

}

//Click handlers setup

