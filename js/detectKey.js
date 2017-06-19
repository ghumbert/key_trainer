'use strict'



//var sample = new VisualizerSample();
var	frequencyDomain = RangeToGet4186Max,
	maxAmplitudeValue = 0,
	maxIndex = 55,
	minIndex = 21,
	keyRange = maxIndex - minIndex,
	totalKey = KEYS.length,


	detectKey = function() {
		var i = 0,
			tabIndexMaxAmplitude = [],
			indexMostPresentFreqSlot = 0,
			randomKeyIndex = generateRandomKey(maxIndex, minIndex),

		analyseTime = setInterval(function(){

			analyser.getByteFrequencyData(sample.freqs);

			var maxAmplitudeValue = 0,
				maxAmplitudeIndex = 0;

			// Parse the frequencies tab and get the maxAmplitude and the maxAmplitudeIndex
			for (var j = 0; j < frequencyDomain; j++) {
				if (sample.freqs[j] > maxAmplitudeValue) {
					maxAmplitudeValue = sample.freqs[j],
					maxAmplitudeIndex = j;
				}
			}

			var	leftValue = sample.freqs[maxAmplitudeIndex-1],
				rightValue = sample.freqs[maxAmplitudeIndex+1],
				ratio = 0.5 + 0.5 * (rightValue - leftValue) / maxAmplitudeValue,
				freq = (ratio + maxAmplitudeIndex - 1) * frequencyRangeBySlot,
				keyIndex = getClosestKey(freq),
				keyIndexTmp = keyIndex;


			//check if it harmonic
			while( keyIndexTmp >= 32 ) {
				keyIndexTmp -= 12;

				let freqIndex = Math.round(KEYS[keyIndexTmp - 1].hz / frequencyRangeBySlot);

				if(sample.freqs[ freqIndex - 1 ] > maxAmplitudeValue / 4
					|| sample.freqs[ freqIndex ] > maxAmplitudeValue / 4 
					|| sample.freqs[ freqIndex + 1] > maxAmplitudeValue / 4
				) {
					keyIndex = keyIndexTmp;
				}
			}


			i++;

			if(randomKeyIndex + 1 === keyIndex && maxAmplitudeValue > 90){
				randomKeyIndex = generateRandomKey(maxIndex, minIndex);
			}

			// //console.log(maxAmplitudeIndex, leftValue, maxAmplitudeValue, rightValue, ratio);
			if(typeof tabIndexMaxAmplitude[keyIndex] === 'undefined') {
				tabIndexMaxAmplitude[keyIndex] = 1;
			} else {
				tabIndexMaxAmplitude[keyIndex]++;
			}

			if(i %10 == 0) {
				//window.clearInterval(analyseTime);
				// for (var k = 0; k < tabIndexMaxAmplitude.length; k++) {
				// 	if(tabIndexMaxAmplitude[k])>
				// }
				//console.log(tabIndexMaxAmplitude);
				//tabIndexMaxAmplitude = [];
			}

	},50);

},


getClosestKey = function(freq) {
	let closerKeyIndex = 0,
		valueDistance = 999999;

	for (var i = 0; i < KEYS.length; i++) {
		if (Math.abs(freq - KEYS[i].hz) < valueDistance) {
			valueDistance = Math.abs(freq - KEYS[i].hz);
			closerKeyIndex = i;
		}
	}
	return KEYS[closerKeyIndex].pos;
},

generateRandomKey = function (max, min) {
	var randomKey = Math.floor(Math.random()*(max-min+1) + min);

	$(".europe").html(KEYS[randomKey].name);
	$(".english").html(KEYS[randomKey].enName);
	placeKey(randomKey);

	return randomKey;
},

placeKey = function (keyIndex) {

	var musicScore = Snap(".staff"),
		height = 300,
		middle = height / 2,
		keyHeight = 10,
		gradationHeight = height / totalKey,
		position = keyIndex - 46,
		keyPosition = middle + position * gradationHeight;

		
	musicScore.circle(150, keyPosition, 6);


	console.log(position, gradationHeight);


};

/*

la
	la#
si0
do0
	do#
ré0
	ré#
mi0
fa0
	fa#
sol0
	sol#

88 - Math.floor((88-1)/12) - Math.floor((88-4)/12) - Math.floor((88-6)/12) - Math.floor((88-9)/12) -Math.floor((8-11)/12)
= 63

attendu 52 bug de camcul

*/