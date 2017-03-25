module.exports = {
  entry: "./lib/first_tone.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map'
  // ,
  // resolve: {
  //     root: __dirname,
  //     modulesDirectories : ["./node_modules/tone/build/Tone.js/"],
  // }
};
