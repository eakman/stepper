# stepper

[Live Link](https://eakman.github.io/stepper/)

Stepper is a web based musical instrument built using a JavaScript, Web Audio framework called [Tone.js](https://github.com/Tonejs/Tone.js).

Pressing the start button starts a 1-measure loop which is represented visually by a 8x5 cell grid. Each column of the grid is designated for an 8th note of the loop. There are 5 cells in each column and they're all mapped to a note of the pentatonic scale. Mousing over cells will activate or deactivate their respective notes.

![alt text](./assets/grid.png)

## tweaking and effects

Above the grid there is a preset reverb and delay as well as a tweak button. Clicking the tweak button opens up a tool bar with an [ADSR filter](http://en.wikiaudio.org/ADSR_envelope) as well as a pith and bpm control.

![alt text](./assets/toolbar.png)

## use w/ midi controllers

Stepper uses [WebMidi.js](https://github.com/cotejp/webmidi), a Web Midi Api framework, and can be used with midi keyboards and other types of midi controllers. That said, this feature's availability may vary depend on browser and controllers. Just plug your device in and stepper should recognize your device. If your device was not plugged in when the page loaded, you may need to refresh.
