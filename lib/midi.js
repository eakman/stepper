const setupMidi = (seq) => {
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

module.exports = setupMidi;
