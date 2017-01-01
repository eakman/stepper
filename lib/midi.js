
const setUpMidi = () => {

  WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }

  });


  const synth2 = new Tone.PolySynth(6, Tone.DuoSynth);

  WebMidi.inputs[0].addListener('noteon', "all", function(e) {
      synth2.triggerAttack(e.note.name + e.note.octave);
  });

  WebMidi.inputs[0].addListener('noteoff', "all", function(e) {
      synth2.triggerRelease(e.note.name + e.note.octave);
  });

};

export default setUpMidi;
