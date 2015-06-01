window.onload= function () {
	//Grab room name from the URL

	var room=location.search && location.search.split('?')[1];
	//Create our webrtc connection
	var webrtc=new SimpleWebRTC({
		//Element holding local video
		localVideoEl: 'localVideo',
		remoteVideosEl: 'remotes',
		autoRequestMedia: true,
		log: true
		});
	//On room ready , join the call
	webrtc.on('readyToCall', function() {
		if(room) webrtc.joinRoom(room);
	});

	function setRoom(name) {
		$('form').remove();
		$('h1').text('Welcome to room '+name);
		$('#subTitle').text('Share this link to have friends join you');
		$('#roomLink').text(location.href);
		$('body').addClass('active');
	}

	if (room) {
                setRoom(room);
            } else {
                $('form').submit(function () {
                    var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
                    webrtc.createRoom(val, function (err, name) {
                        var newUrl = location.pathname + '?' + name;
                        if (!err) {
                            history.replaceState({foo: 'bar'}, null, newUrl);
                            setRoom(name);
                        }
                    });
                    return false;          
                });
            }
}