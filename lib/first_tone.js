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
      const notes = ['g3', 'a3', 'c4', 'd4', 'e4'];
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
});
