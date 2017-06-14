
let WIDTH =  window.innerWidth;
let HEIGHT = window.innerHeight;

var analyserCanvas = document.getElementById('analyserCanvas'),
	freqCtx = analyserCanvas.getContext('2d'),
	maxFreqsIndex = 0;

analyserCanvas.width = WIDTH;
analyserCanvas.height = HEIGHT;

drawAnalyser = function() {

	freqCtx.clearRect(0,0,WIDTH,HEIGHT); // clear canvas

	analyser.getByteFrequencyData(sample.freqs);

	maxAmplitudeValue = 0;
	//maxFreqsIndex = 0;
	// parse the average amplitude value of the frequencies 
	for (var i = 0; i < frequencyDomain; i++) {
		var value = sample.freqs[i],
			percent = value / 256,
			height = HEIGHT * percent,
			offset = HEIGHT - height - 1,
			barWidth = WIDTH/frequencyDomain,
			hue = i/frequencyDomain * 180;

		freqCtx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
		freqCtx.fillRect(i * barWidth, offset, barWidth, height);

		if(value > maxAmplitudeValue) {
			maxFreqsIndex = i;
			maxAmplitudeValue = value;
			//console.log(frequencyRangeBySlot*maxFreqsIndex);
			var freqs = frequencyRangeBySlot * maxFreqsIndex,
				rank = Math.round(Math.log((27.5 + freqs)/27.5)/Math.log(1.059463094) + 1);
			//console.log(i + "  |||  " + freqs + "  |||   " + rank);
		}
	}

	requestAnimationFrame(drawAnalyser);
};