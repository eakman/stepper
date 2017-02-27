const envelopeListeners = require('./envelope.js');
const bP = require('./pitch_bpm.js');

const setupFaders = (seq) => {
  envelopeListeners(seq);
  bP.pitchListener(seq);
  bP.bpmListener();
};

module.exports = setupFaders;
