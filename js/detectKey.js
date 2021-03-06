'use strict'



//var sample = new VisualizerSample();
var	frequencyDomain = RangeToGet4186Max,
	maxAmplitudeValue = 0,
	maxIndex = 55,
	minIndex = 40,
	keyRange = maxIndex - minIndex,
	totalKey = KEYS.length,
	totalDiatonic = totalKey - Math.ceil((totalKey-1)/12) - Math.ceil((totalKey-4)/12) - Math.ceil((totalKey-6)/12) - Math.ceil((totalKey-9)/12) -Math.ceil((totalKey-11)/12),
	height = 300,
	gradationHeight = height / totalDiatonic,


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

	$(".europe").html(KEYS[randomKey - 1].name);
	$(".english").html(KEYS[randomKey - 1].enName);
	placeKey(randomKey);

	return randomKey;
},

placeKey = function (keyIndex) {


	var musicScore = Snap(".staff"),
		diatonicDistance = keyIndex - Math.ceil((keyIndex-1)/12) - Math.ceil((keyIndex-4)/12) - Math.ceil((keyIndex-6)/12) - Math.ceil((keyIndex-9)/12) - Math.ceil((keyIndex-11)/12),

		keyPosition = diatonicDistance * gradationHeight;

	$("circle, text").remove();
	if(KEYS[keyIndex].name.includes("#")){
		console.log("diese");
		musicScore.text(160,keyPosition+16,"#");
	}

	musicScore.circle(150, keyPosition, 6);

	console.log(keyIndex, diatonicDistance, keyPosition);





};

/*

comment calculer keyPosition


*/