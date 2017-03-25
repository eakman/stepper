const StepSequencer = require('./step_sequencer.js');
const setupMidi = require('./setup/midi.js');
const setupButtons = require('./setup/buttons.js');
const setupTransport = require('./setup/transport.js');
const setupFaders = require('./setup/faders.js');

document.addEventListener("DOMContentLoaded", function(event) {

  const seq = new StepSequencer();
  seq.setupSteps();
  seq.setupListeners();

  setupMidi(seq);

  setupTransport(seq);

  setupButtons(seq);

  setupFaders(seq);

});
