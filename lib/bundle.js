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
/***/ function(module, exports) {

	class StepSequencer {
	  constructor() {
	    this.notes = [['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~']];
	    this.reverb = new Tone.Freeverb(0.5).connect(Tone.Master);
	    this.synth = new Tone.PolySynth(5, Tone.DuoSynth).chain(this.reverb);
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
	  seq.reverb.wet.input.value = 0;
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
	
	  const resetSliders = () => {
	    $('.a-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.attack * 100}%`;
	    $('.d-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.decay * 100}%`;
	    $('.s-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.sustain * 55}%`;
	    $('.r-slide')[0].style.bottom = `${seq.synth.voices[0].voice1.envelope.release * 10}%`;
	  };
	
	  document.getElementsByClassName('side-bar-toggle')[0].addEventListener('click', (e) => {
	    const sideBar = document.getElementsByClassName('side-bar')[0];
	    if (sideBar.style.visibility === 'visible'){
	      sideBar.style.visibility = 'hidden';
	      sideBar.style.opacity = 0;
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
	    } else {
	      e.currentTarget.attributes.on.value = 'false';
	      seq.reverb.wet.input.value = 0;
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
	
	  } );
	
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map