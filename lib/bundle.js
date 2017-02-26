/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const StepSequencer = __webpack_require__(1);
	const setUpMidi = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function(event) {
	
	  const seq = new StepSequencer();
	
	  setUpMidi(seq);
	  seq.setupSteps();
	  seq.setupListeners();
	  seq.reverb.wet.input.value = 0;
	  seq.delay.wet.input.value = 0;
	
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
	
	  document.getElementsByClassName('start-stop-button')[0].addEventListener('click', (e) => {
	    if (e.target.innerHTML === 'start') {
	      seq.start();
	      e.target.innerHTML = 'stop';
	    } else {
	      seq.stop();
	      e.target.innerHTML = 'start';
	    }
	  });
	
	  document.getElementsByClassName('reset')[0].addEventListener('click', (e) => {
	    Array.from(document.getElementsByClassName('step')).forEach((step) => {
	      step.setAttribute('selected', 'false');
	      step.style.opacity = '1';
	    });
	    seq.notes = [['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~']];
	  });
	
	  const resetSliders = () => {
	    $('.a-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.attack * 100}%`;
	    $('.d-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.decay * 100}%`;
	    $('.s-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.sustain * 55}%`;
	    $('.r-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.release * 10}%`;
	  };
	
	  document.getElementsByClassName('side-bar-toggle')[0].addEventListener('click', (e) => {
	    const sideBar = document.getElementsByClassName('side-bar')[0];
	    if (sideBar.style.visibility === 'visible'){
	      sideBar.style.opacity = 0;
	      window.setTimeout(() => {
	        sideBar.style.visibility = 'hidden';
	      }, 260);
	
	    } else {
	      sideBar.style.visibility = 'visible';
	      sideBar.style.opacity = 1;
	      resetSliders();
	    }
	  });
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class StepSequencer {
	  constructor() {
	    this.notes = [['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~']];
	    this.reverb = new Tone.Freeverb(0.25).connect(Tone.Master);
	    this.delay = new Tone.FeedbackDelay("8n", 0.5);
	    this.synth = new Tone.PolySynth(11, Tone.DuoSynth).chain(this.delay, this.reverb);
	    this.synth.volume.input.value = 0.25;
	  }
	
	  start() {
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
	        // stepColumn.className = 'step-column';
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
	
	module.exports = StepSequencer;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const setUpMidi = (seq) => {
	  WebMidi.enable(function (err) {
	    if (err) {
	    } else {
	      if (WebMidi.inputs[0]){
	        WebMidi.inputs[0].addListener('noteon', "all", function(e) {
	            seq.synth.triggerAttack(e.note.name + e.note.octave);
	        });
	        WebMidi.inputs[0].addListener('noteoff', "all", function(e) {
	            seq.synth.triggerRelease(e.note.name + e.note.octave);
	        });
	      }
	    }
	  });
	};
	
	module.exports = setUpMidi;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map