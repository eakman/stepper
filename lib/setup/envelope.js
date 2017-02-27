const handleAttack = (voice, ui, divisor) => {
  voice.voice0.envelope.attack = (ui.value / divisor);
  voice.voice1.envelope.attack = (ui.value / divisor);
};

const handleDecay = (voice, ui, divisor) => {
  voice.voice0.envelope.decay = (ui.value / divisor);
  voice.voice1.envelope.decay = (ui.value / divisor);
};

const handleSustain = (voice, ui, divisor) => {
  voice.voice0.envelope.sustain = (ui.value / divisor);
  voice.voice1.envelope.sustain = (ui.value / divisor);
};

const handleRelease = (voice, ui, divisor) => {
  voice.voice0.envelope.release = (ui.value / divisor);
  voice.voice1.envelope.release = (ui.value / divisor);
};

const handleSlide = (event, ui, seq) => {
  let param = '';
  const faderVal = event.target.attributes.control.value;
  const voices = seq.synth.voices;
  if (faderVal === 'a') {
    for (let i = 0; i < voices.length; i++){
      const voice = voices[i];
      handleAttack(voice, ui, 100);
    }
  } else if (faderVal === 'd') {
    for (let i = 0; i < voices.length; i++){
      const voice = voices[i];
      handleDecay(voice, ui, 100);
    }
  } else if (faderVal === 's') {
    for (let i = 0; i < voices.length; i++){
      const voice = voices[i];
      handleSustain(voice, ui, 55);
    }
  }else if (faderVal === 'r') {
    for (let i = 0; i < voices.length; i++){
      const voice = voices[i];
      handleRelease(voice, ui, 10);
    }
  }
};

const envelopeListeners = (seq) => {
  $( function() {
    $( ".fader" ).slider({
        orientation: "vertical",
        min: 0,
        max: 100,
        classes: {
          "ui-slider-handle": "slider"
        },
        slide: function(event, ui) {
          handleSlide(event, ui, seq);
        }
    });
  });
};

module.exports = envelopeListeners;
