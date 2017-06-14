var FFT_SIZE = 16384, // table length = 16384/2 = 8192
	frequencyMax = audioCtx.sampleRate / 2, // sample rate = 2 times max frequency 
	frequencyRangeBySlot = frequencyMax / (FFT_SIZE / 2), // 2.69 HZ if sampleRate = 44100
	RangeToGet4186Max = 4186 / frequencyRangeBySlot; // 4186 is the last key of a piano


var analyser = audioCtx.createAnalyser();



// SET GLOBAL ANALYSEUR PARAM
analyser.minDecibels = -100;
analyser.maxDecibels = -5;
analyser.fftSize = FFT_SIZE;



var sample = {};
sample.freqs = new Uint8Array(analyser.frequencyBinCount).slice(0,RangeToGet4186Max);

//source.connect(analyser);