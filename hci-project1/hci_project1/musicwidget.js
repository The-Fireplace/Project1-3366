let playButton = null, pauseButton = null, nextButton = null, prevButton = null;
let playing = false;
let curTimeStamp = Math.floor(Math.random()*100);
let maxTimeStamp = 500;
let curTrack = 'Nothing Playing';

function musicWidgetDraw(x, y, w, h) {
  //Draw progress bar at the bottom
  noStroke();
  fill('rgba(0, 0, 0, 0.5)');
  rect(x, y+h-4, w, 4);
  fill('rgba(100, 255, 100, 0.8)');
  rect(x, y+h-4, getProgress(w), 4);
  circle(x+getProgress(w), y+h-2, 6);
  //Set up buttons if they are not set up yet
  if(playButton == null) {
    playButton = createDiv("<i class='fas fa-play'></i>");
    pauseButton = createDiv("<i class='fas fa-pause'></i>");
    nextButton = createDiv("<i class='fas fa-forward'></i>");
    prevButton = createDiv("<i class='fas fa-backward'></i>");
  }
  //Set positions for buttons
  prevButton.position(x+4, y+h/2);
  nextButton.position(x+w-18, y+h/2);
  //turn play/pause buttons on and off as needed
  if(!playing) {
    pauseButton.html('', false);
    playButton.html("<i class='fas fa-play'></i>", false);
    playButton.position(x+w/2-9, y+h/2);
  } else {
    playButton.html('', false);
    pauseButton.html("<i class='fas fa-pause'></i>", false);
    pauseButton.position(x+w/2-9, y+h/2);
    if(curTimeStamp < maxTimeStamp) {
      curTimeStamp++;
    } else {
      curTimeStamp = 0;
    }
  }
  //Show the label for the currently playing track
  fill(0);
  textAlign(TOP, LEFT);
  text(curTrack, x, y, w, h/4);
}

function musicWidgetClick(x, y, w, h) {
  if(Math.abs(w/2-x) <= 8 && Math.abs(h/2+6-y) <= 8) {
    playing = !playing;
  }
}

function getProgress(w) {
  return curTimeStamp/maxTimeStamp*w;
}