const StepSequencer = require('./step_sequencer.js');
const setUpMidi = require('./midi.js');
const buttonSetup = require('./buttons.js');

document.addEventListener("DOMContentLoaded", function(event) {

  const seq = new StepSequencer();

  setUpMidi(seq);
  seq.setupSteps();
  seq.setupListeners();

  let i = 0;
  let col_num = 0;
  let last_col = null;
  Tone.Transport.scheduleRepeat(function(time){
    if (last_col) {
      last_col.style.opacity = '1';
    }
    last_col = document.getElementsByClassName(`scol-${col_num}`)[0];
    last_col.style.opacity = '0.8';
    col_num = (col_num + 1) % 8;
    if (seq.notes[i][0] !== '~'){
      seq.synth.triggerAttackRelease(seq.notes[i], "4n");
    }
    i = (i + 1) % seq.notes.length;
  }, "8n");

  buttonSetup(seq);

  document.getElementsByClassName('reverb')[0].addEventListener('click', (e) => {
    if (e.currentTarget.attributes.on.value === 'false'){
      e.currentTarget.attributes.on.value = 'true';
      seq.reverb.wet.input.value = 0.5;
      e.currentTarget.style.background = 'rgb(160, 177, 214)';
      e.currentTarget.style.color = 'white';
    } else {
      e.currentTarget.attributes.on.value = 'false';
      seq.reverb.wet.input.value = 0;
      e.currentTarget.style.background = 'white';
      e.currentTarget.style.color = 'rgb(160, 177, 214)';
    }
  });

  document.getElementsByClassName('delay')[0].addEventListener('click', (e) => {
    if (e.currentTarget.attributes.on.value === 'false'){
      e.currentTarget.attributes.on.value = 'true';
      seq.delay.wet.input.value = 0.5;
      e.currentTarget.style.background = 'rgb(160, 177, 214)';
      e.currentTarget.style.color = 'white';
    } else {
      e.currentTarget.attributes.on.value = 'false';
      seq.delay.wet.input.value = 0;
      e.currentTarget.style.background = 'white';
      e.currentTarget.style.color = 'rgb(160, 177, 214)';
    }
  });

  $( function() {
    $( ".fader" ).slider({
      orientation: "vertical",
      min: 0,
      max: 100,
      classes: {
        "ui-slider-handle": "slider"
      },
      slide: function(event, ui) {
        let param = '';
        if (event.target.attributes.control.value === 'a') {
          for (let i = 0; i < seq.synth.voices.length; i++){
            const voice = seq.synth.voices[i];
            voice.voice0.envelope.attack = (ui.value / 100);
            voice.voice1.envelope.attack = (ui.value / 100);
          }
        } else if (event.target.attributes.control.value === 'd') {
          for (let i = 0; i < seq.synth.voices.length; i++){
            const voice = seq.synth.voices[i];
            voice.voice0.envelope.decay = (ui.value / 100);
            voice.voice1.envelope.decay = (ui.value / 100);
          }
        } else if (event.target.attributes.control.value === 's') {
          for (let i = 0; i < seq.synth.voices.length; i++){
            const voice = seq.synth.voices[i];
            voice.voice0.envelope.sustain = (ui.value / 55);
            voice.voice1.envelope.sustain = (ui.value / 55);
          }
        }else if (event.target.attributes.control.value === 'r') {
          for (let i = 0; i < seq.synth.voices.length; i++){
            const voice = seq.synth.voices[i];
            voice.voice0.envelope.release = (ui.value / 10);
            voice.voice1.envelope.release = (ui.value / 10);
          }
        }
      }
    });
  });

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
