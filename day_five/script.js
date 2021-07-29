// Initial data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// Download Image Start
let downImg = document.querySelector('.down')

downImg.onclick = function(){
    download(screen, 'MyImage.png');
  }
// Download Image End


// Events 
document.querySelectorAll('.colorArea .color').forEach(item => { // Select color area
    item.addEventListener('click', colorClickEvent); // Add event click
});

screen.addEventListener('mousedown', mouseDownEvent); // Capture click mouse
screen.addEventListener('mousemove', mouseMoveEvent); // Capture move mouse
screen.addEventListener('mouseup', mouseUpEvent); // Capture unclick mouse
document.querySelector('.clear').addEventListener('click', clearScreen); // Clear screen

// Functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color'); // Get attribute color
    currentColor = color; // Save color in currentColor

    document.querySelector('.color.active').classList.remove('active'); // Remove class active
    e.target.classList.add('active'); // Add class active
};

function mouseDownEvent(e) {
    canDraw = true; // Mouse down  = draw
    mouseX = e.pageX - screen.offsetLeft; // Get mouse position
    mouseY = e.pageY - screen.offsetTop; // Get mouse position
}

function mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false; // Mouse up = cant draw
}

function draw (x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath(); // Start draw line
    ctx.lineWidth = 5; // Width line
    ctx.lineJoin = "round"; // Format line
    ctx.moveTo(mouseX, mouseY); // Move cursor
    ctx.lineTo(pointX, pointY); // Draw line to
    ctx.closePath(); // Close draw
    ctx.strokeStyle = currentColor; // Color line
    ctx.stroke(); // Finish draw

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Source from:  http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas

/* Canvas Donwload */
function download(screen, filename) {
    /// create an "off-screen" anchor tag
    let lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = screen.toDataURL("image/png;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }