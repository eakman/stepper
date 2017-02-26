
const startStopListener = (seq) => {
  document.getElementsByClassName('start-stop-button')[0].addEventListener('click', (e) => {
    if (e.target.innerHTML === 'start') {
      seq.start();
      e.target.innerHTML = 'stop';
    } else {
      seq.stop();
      e.target.innerHTML = 'start';
    }
  });
};

const resetListener = (seq) => {
  document.getElementsByClassName('reset')[0].addEventListener('click', (e) => {
    Array.from(document.getElementsByClassName('step')).forEach((step) => {
      step.setAttribute('selected', 'false');
      step.style.opacity = '1';
    });
    seq.notes = [['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~'], ['~']];
  });
};

const buttonSetup = (seq) => {
  startStopListener(seq);
  resetListener(seq);
};

module.exports = buttonSetup;
