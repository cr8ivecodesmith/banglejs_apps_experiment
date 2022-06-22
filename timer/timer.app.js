var counter = 30;
var counterInterval;

function outOfTime() {
  if (counterInterval) return;

  E.showMessage("Out of Time", "My Timer");
  Bangle.buzz();
  Bangle.beep(200, 4000)
    .then(() => new Promise(resolve => setTimeout(resolve, 200)))
    .then(() => Bangle.beep(200, 3000));
  // repeat 10 secs later
  setTimeout(outOfTime, 10000);
}

function countDown() {
  counter--;
  // Out of time
  if (counter <= 0) {
    clearInterval(counterInterval);
    counterInterval = undefined;
    setWatch(startTimer, (process.env.HWVERSION == 2) ? BTN1 : BTN2);
    outOfTime();
    return;
  }

  g.clear();
  g.setFontAlign(0, 0);
  g.setFont("Vector", 80);
  // draw the current counter value
  g.drawString(counter, 120, 120);
  // optional - this keeps the watch LCD lit up
  Bangle.setLCDPower(0.5);
}

// Main
function startTimer() {
  counter = 30;
  countDown();
  if (!counterInterval)
    counterInterval = setInterval(countDown, 1000);
}

startTimer();