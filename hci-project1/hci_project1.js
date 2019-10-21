let selectedWidget = null;
let widgets = [];
let capture;

function setup() {
  
  createCanvas(1000, 1000);
  // capture = createCapture(VIDEO);
  // capture.size(1000, 1000);
  // capture.hide();
  
  //dayViewWidget add the following two lines
  dayViewSun();
  widgets[0] = newWidget(750, 0, 250, 200, dayViewDraw, noClick);
  
   
//   loadNews();
//   setupHealthWidget(widgets[1].w, widgets[1].h);
}

//Creates a new idget object with the specified initial position, size, and function for draw and click.
//drawFunc(int x, int y, int width, int height) where x,y is the top left corner of the widget
//clickFunc(int x, int y, int width, int height) where x,y is the position within the widget that was clicked, so the top left corner of the widget is 0,0 and the bottom right is the widget's width,height.
function newWidget(x, y, w, h, drawFunc, clickFunc) {
  return {posX:x,posY:y,w:w,h:h,oX:0,oY:0,draw:drawFunc,click:clickFunc,};
}

function mousePressed() {
  for(let r in widgets) {
      r = widgets[r];
      if(mouseX > r.posX && mouseX < r.posX + r.w && mouseY > r.posY && mouseY < r.posY + r.h) {
        if(selectedWidget == null) {
          selectedWidget = r;
          r.oX = mouseX - r.posX;
          r.oY = mouseY - r.posY;
        }
        //Call the widget's click handler
        r.click(mouseX-r.posX, mouseY-r.posY, r.w, r.h);
        break;
      }
    }
}

function mouseReleased() {
  selectedWidget = null;
}

function draw() {
  background(200);
  // image(capture, 0, 0, 1000, 1000);
  //Update dragging rectangle position
  if(selectedWidget != null) {
    selectedWidget.posX = mouseX - selectedWidget.oX;
    selectedWidget.posY = mouseY - selectedWidget.oY;
  }
  //for each widget, we want to draw the background then call the widget's draw function.
  for(let r in widgets) {
    r = widgets[r];
    //Give the widget background some transparency for a more mirror-like look. Make it less transparent if being dragged.
    if(selectedWidget == r) {
      fill('rgba(255,255,255, 0.6)');
    } else {
      fill('rgba(255,255,255, 0.4)');
    }
    noStroke();
    //draw background
    rect(r.posX, r.posY, r.w, r.h);
    //call widget's draw for the foreground
    r.draw(r.posX, r.posY, r.w, r.h);
  }
}

//A simple method to test clicking within widgets
function noClick(x, y, w, h) {
}
