/**
 * @name Frequency Spectrum
 * @description <p>Visualize the frequency spectrum of live audio input.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
let mic, fft;

function setup() {
  createCanvas(710, 400);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(200);

  let spectrum = fft.analyze();

  beginShape();
  noFill();
  strokeWeight(1);
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();

  beginShape();
  let numBars = 10;
  let barWidth = float(width / numBars);
  stroke(255);
  strokeWeight(int(barWidth/10))
  for (i = 0; i < numBars; i++) {
    fill(255, 255, 255, 128);
    rect(
      int(i * barWidth),
      0,
      barWidth,
      map(spectrum[i * int(barWidth)], 0, 255, height, 0)
    );
    fill(0, 0, 0, 128);
    rect(
      int(i * barWidth),
      map(spectrum[i * int(barWidth)], 0, 255, height, 0),
      barWidth,
      height
    );
  }
  endShape();
}
