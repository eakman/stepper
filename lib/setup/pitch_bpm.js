const allNotes = require('./notes.js');

const modulate = (steps, seq) => {
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

module.exports = {
  pitchListener: (seq) => {
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
            modulate(steps, seq);
          }
      });
    });
  },

  bpmListener: () => {
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
  }
};
