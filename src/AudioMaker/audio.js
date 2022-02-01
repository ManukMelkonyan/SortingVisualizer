const AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = null;
var g = null;

const VOLUME_CURVE = [1.0, 0.61, 0.37, 0.22, 0.14, 0.08, 0.05, 0.0];

const playTone = (frequency = 440, type = 'sine', duration = 1.3) => {
  o = context.createOscillator();
  g = context.createGain();
  o.connect(g);
  o.type = type;
  o.frequency.value = frequency;
  g.connect(context.destination);
  o.start(0);
  //g.gain.exponentialRampToValueAtTime(0.0001,context.currentTime + duration);
  g.gain.setValueCurveAtTime(VOLUME_CURVE, context.currentTime, duration);
};

export function playSound(waveType, startFreq, endTime) {
  var oscillatorNode = context.createOscillator();
  var gainNode = context.createGain();

  oscillatorNode.type = waveType;
  oscillatorNode.frequency.setValueAtTime(startFreq, context.currentTime);

  for (var i = 3; i < arguments.length; i += 2) {
    oscillatorNode.frequency.exponentialRampToValueAtTime(
      arguments[i],
      context.currentTime + arguments[i + 1]
    );
  }
  gainNode.gain.setValueAtTime(0.3, context.currentTime);
  gainNode.gain.setValueCurveAtTime(VOLUME_CURVE, context.currentTime, 2.0);

  oscillatorNode.connect(gainNode);
  gainNode.connect(context.destination);

  oscillatorNode.start();
  oscillatorNode.stop(context.currentTime + endTime);
}
