const envelopeListeners = require('./envelope.js');

const setupFaders = (seq) => {
  envelopeListeners(seq);
};

module.exports = setupFaders;
