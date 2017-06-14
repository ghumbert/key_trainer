'use strict';

var audioCtx = new window.AudioContext(),
    maxFreqsIndex = 0,
	myAudio = document.getElementById('audioSource')/*,
	source = audioCtx.createMediaElementSource(myAudio)*/;



function gotStream(stream) {

    // Create an AudioNode from the stream.
    var source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    requestAnimationFrame(drawAnalyser);


    window.setTimeout(function(){detectKey()},1000);
    
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio );
