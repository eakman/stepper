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

const reverbListener = (seq, signatureColor, onVal, offVal) => {
  document.getElementsByClassName('reverb')[0].addEventListener('click', (e) => {
    const cT = e.currentTarget;
    const style = cT.style;
    const atts = cT.attributes;
    if (atts.on.value === 'false'){
      atts.on.value = 'true';
      seq.reverb.wet.input.value = onVal;
      style.background = signatureColor;
      style.color = 'white';
    } else {
      atts.on.value = 'false';
      seq.reverb.wet.input.value = offVal;
      style.background = 'white';
      style.color = signatureColor;
    }
  });
};

const delayListener = (seq, signatureColor, onVal, offVal) => {
  document.getElementsByClassName('delay')[0].addEventListener('click', (e) => {
    const cT = e.currentTarget;
    const style = cT.style;
    const atts = cT.attributes;
    if (atts.on.value === 'false'){
      atts.on.value = 'true';
      seq.delay.wet.input.value = onVal;
      style.background = signatureColor;
      style.color = 'white';
    } else {
      atts.on.value = 'false';
      seq.delay.wet.input.value = offVal;
      style.background = 'white';
      style.color = signatureColor;
    }
  });
};

const reverbDelayListeners = (seq) => {
  const signatureColor = 'rgb(160, 177, 214)';
  const onVal = 0.5;
  const offVal = 0;
  reverbListener(seq, signatureColor, onVal, offVal);
  delayListener(seq, signatureColor, onVal, offVal);
};

const buttonSetup = (seq) => {
  startStopListener(seq);
  resetListener(seq);
  sideBarListener();
  reverbDelayListeners(seq);
};

module.exports = buttonSetup;
