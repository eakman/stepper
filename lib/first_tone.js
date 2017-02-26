const StepSequencer = require('./step_sequencer.js');
const setupMidi = require('./midi.js');
const setupButtons = require('./buttons.js');
const setupTransport = require('./transport.js');
const setupFaders = require('./faders.js');

document.addEventListener("DOMContentLoaded", function(event) {

  const seq = new StepSequencer();
  seq.setupSteps();
  seq.setupListeners();

  setupMidi(seq);

  setupTransport(seq);

  setupButtons(seq);

  setupFaders(seq);

  const modulate = (steps) => {
    const allNotes = [
      'c2', 'c#2', 'd2', 'd#2', 'e2', 'f2', 'f#2', 'g2', 'g#2', 'a2', 'a#2', 'b2',
      'c3', 'c#3', 'd3', 'd#3', 'e3', 'f3', 'f#3', 'g3', 'g#3', 'a3', 'a#3', 'b3',
      'c4', 'c#4', 'd4', 'd#4', 'e4', 'f4', 'f#4', 'g4', 'g#4', 'a4', 'a#4', 'b4',
      'c5', 'c#5', 'd5', 'd#5', 'e5', 'f5', 'f#5', 'g5', 'g#5', 'a5', 'a#5', 'b5',
      'c6', 'c#6', 'd6', 'd#6', 'e6', 'f6', 'f#6', 'g6', 'g#6', 'a6', 'a#6', 'b6',
      'c7', 'c#7', 'd7', 'd#7', 'e7', 'f7', 'f#7', 'g7', 'g#7', 'a7', 'a#7', 'b7' ];
    Array.from($('.step')).forEach((step) => {
      const startNote = allNotes.indexOf(step.attributes.note.value);
      step.attributes.note.value = allNotes[(startNote + steps) % 72];
    });
    for ( let i = 0; i < seq.notes.length; i++ ) {
      for ( let j = 0; j < seq.notes[i].length; j ++ ) {
        if (seq.notes[i][j] !== '~'){
          const startNote1 = allNotes.indexOf(seq.notes[i][j]);
          seq.notes[i][j] = allNotes[(startNote1 + steps) % 72];
        }
      }
    }
  };

  $( function() {
    $( ".pitch-fader" ).slider({
      orientation: "vertical",
      range: "min",
      value: 19,
      min: 0,
      max: 62,
      classes: {
        "ui-slider-handle": "slider"
      },
      change: function(event, ui){
        const oldPos = document.getElementsByClassName('pitch-slide')[0].attributes.pos.value;
        document.getElementsByClassName('pitch-slide')[0].attributes.pos.value = ui.value;
        const steps = ui.value - parseInt(oldPos);
        if (!steps <= 0){
          modulate(steps);
        }
      }
    });
  });

  $( function() {
    $( ".bpm-fader" ).slider({
      orientation: "vertical",
      range: "min",
      value: 120,
      min: 25,
      max: 350,
      classes: {
        "ui-slider-handle": "slider"
      },
      change: function(event, ui){
        Tone.Transport.bpm.value = ui.value;
      }
    });
  });
});
