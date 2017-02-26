const setupTransport = (seq) => {
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
};

module.exports = setupTransport;
