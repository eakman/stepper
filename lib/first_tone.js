class StepSequencer {
  constructor() {
    this.notes = [['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~']];
    this.synth = new Tone.PolySynth(6, Tone.DuoSynth).toMaster();
  }

  start() {
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  setupSteps() {
    for (let i = 0; i < 8; i++) {
      const stepColumn = document.createElement('div');
      // const notes = ['g2', 'a2', 'c3', 'd3', 'e3', 'g3', 'a3', 'c4', 'd4', 'e4'];
      const notes = ['e4', 'd4','c4', 'a3','g3'];
      for (let j = 0; j < 5; j++) {
        const step = document.createElement('div');
        step.setAttribute('selected','false');
        step.setAttribute('column', i);
        step.setAttribute('note', notes[j]);
        const stepContainer = document.createElement('div');
        step.className = 'step';
        stepContainer.className = 'step-container';
        stepContainer.appendChild(step);
        stepColumn.className = 'step-column';
        stepColumn.appendChild(stepContainer);
      }
      const steps = document.getElementsByClassName('steps')[0].appendChild(stepColumn);
    }
  }

  setupListeners() {
    Array.from(document.getElementsByClassName('step')).forEach((step) => {
          step.addEventListener('mouseenter', (e) => {
            if (step.attributes.selected.value === 'false'){
              step.setAttribute('selected', 'true');
              step.style.opacity = '0.5';

              if (this.notes[parseInt(step.attributes.column.value)][0] === '~'){
                this.notes[parseInt(step.attributes.column.value)].splice(0, 1, step.attributes.note.value);
              } else {
                if (!this.notes[parseInt(step.attributes.column.value)].includes(step.attributes.note.value)){
                  this.notes[parseInt(step.attributes.column.value)].push(step.attributes.note.value);
                }
              }
            } else {
              step.setAttribute('selected', 'false');
              step.style.opacity = '1';
              if (this.notes[parseInt(step.attributes.column.value)].length === 1){
                this.notes[parseInt(step.attributes.column.value)].splice(0, 1, '~');
              } else {
                this.notes[parseInt(step.attributes.column.value)].splice(this.notes.indexOf(step.attributes.note.value), 1);
              }
            }
        });
      });
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  const seq = new StepSequencer();
  seq.setupSteps();
  seq.setupListeners();
  let i = 0;
  Tone.Transport.scheduleRepeat(function(time){
    if (seq.notes[i][0] !== '~'){
      seq.synth.triggerAttackRelease(seq.notes[i], "4n");
    }
    i = (i + 1) % seq.notes.length;
  }, "8n");

  document.getElementsByClassName('start-stop-button')[0].addEventListener('click', (e) => {
    if (e.target.innerHTML === 'start') {
      seq.start();
      e.target.innerHTML = 'stop';
    } else {
      seq.stop();
      e.target.innerHTML = 'start';
    }
  });

  document.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      Tone.Transport.bpm.value -= 5;
      console.log(Tone.Transport.bpm);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      Tone.Transport.bpm.value += 5;
    }
  });

  document.getElementsByClassName('side-bar-toggle')[0].addEventListener('click', (e) => {
    const sideBar = document.getElementsByClassName('side-bar')[0];
    if (sideBar.style.visibility === 'visible'){
      sideBar.style.visibility = 'hidden';
      sideBar.style.opacity = 0;
    } else {
      sideBar.style.visibility = 'visible';
      sideBar.style.opacity = 1;
    }

  });

  // const setEnvelopeParam = (param, value) => {
  //   for (let i = 0; i < seq.synth.voices.length; i++){
  //     const voice = seq.synth.voices[i];
  //     debugger
  //     voice.voice0.envelope.param = value;
  //     voice.voice1.envelope.param = value;
  //   }
  //   debugger
  //   console.log(seq.synth.voices[0].voice0.envelope);
  // };

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
        console.log(seq.synth.voices[4].voice1.envelope);
      }
    });

  } );



  // $('.ui-slider-handle')[1].style.bottom = '65%'
// seq.synth.voices.forEach((voice) => { voice.voice0.envelope.set({'attack': .03, 'decay': .5, 'sustain': .05, 'release': .0}); voice.voice1.envelope.set({'attack': 1, 'decay': 4, 'sustain': 2, 'release': 0});});

});
