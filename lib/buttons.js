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

const sideBarListener = () => {
  document.getElementsByClassName('side-bar-toggle')[0].addEventListener('click', (e) => {
    const sideBar = document.getElementsByClassName('side-bar')[0];
    const styleAtt = sideBar.style;
    if (styleAtt.visibility === 'visible'){
      styleAtt.opacity = 0;
      window.setTimeout(() => {
        styleAtt.visibility = 'hidden';
      }, 260);

    } else {
      styleAtt.visibility = 'visible';
      styleAtt.opacity = 1;
    }
  });
};

const buttonSetup = (seq) => {
  startStopListener(seq);
  resetListener(seq);
  sideBarListener();
};

module.exports = buttonSetup;
