class StepSequencer {
  constructor() {
    this.notes = [['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~']];
    this.reverb = new Tone.Freeverb(0.25).connect(Tone.Master);
    this.delay = new Tone.FeedbackDelay("8n", 0.5);
    this.synth = new Tone.PolySynth(11, Tone.DuoSynth).chain(this.delay, this.reverb);
    this.synth.volume.input.value = 0.25;
    this.reverb.wet.input.value = 0;
    this.delay.wet.input.value = 0;
  }

  start() {
    Tone.context.resume();
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  setupSteps() {
    const randIdxs = [];
    for (let i = 0; i < 8; i++) {
      randIdxs.push(Math.floor( Math.random() * 6));
    }
    for (let i = 0; i < 8; i++) {
      const stepColumn = document.createElement('div');
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
        stepColumn.className = `step-column scol-${i}`;
        stepColumn.appendChild(stepContainer);
        if ( j === randIdxs[i] ){
          step.setAttribute('selected','true');
          step.style.opacity = 0.5;
          this.notes[parseInt(step.attributes.column.value)].splice(0, 1, step.attributes.note.value);
        }
      }
      const steps = document.getElementsByClassName('steps')[0].appendChild(stepColumn);
    }
  }

  setupListeners() {
    Array.from(document.getElementsByClassName('step')).forEach((step) => {
          step.addEventListener('mouseenter', (e) => {
            const atts = step.attributes;
            const column = atts.column;
            if (atts.selected.value === 'false'){
              step.setAttribute('selected', 'true');
              step.style.opacity = '0.5';
              if (this.notes[parseInt(column.value)][0] === '~') {
                this.notes[parseInt(column.value)].splice(0, 1, atts.note.value);
              } else {
                if (!this.notes[parseInt(column.value)].includes(atts.note.value)){
                  this.notes[parseInt(column.value)].push(atts.note.value);
                }
              }
            } else {
              step.setAttribute('selected', 'false');
              step.style.opacity = '1';
              if (this.notes[parseInt(column.value)].length === 1){
                this.notes[parseInt(column.value)].splice(0, 1, '~');
              } else {
                this.notes[parseInt(column.value)].splice(this.notes.indexOf(atts.note.value), 1);
              }
            }
        });
    });
  }
}

module.exports = StepSequencer;
