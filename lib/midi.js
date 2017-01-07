
const setUpMidi = (synth) => {

  WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }

  });


  WebMidi.inputs[0].addListener('noteon', "all", function(e) {
      synth.triggerAttack(e.note.name + e.note.octave);
  });

  WebMidi.inputs[0].addListener('noteoff', "all", function(e) {
      synth.triggerRelease(e.note.name + e.note.octave);
  });

};

module.exports = setUpMidi;
