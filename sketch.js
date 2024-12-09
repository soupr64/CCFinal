//things to do (dont forget, idiot)
//boot back to home screen on death
//make home screen
//sorting wrong color kills you
//fix blue ball not bouncing in its zone
//fix mouse dragging balls offscreen
//settings, customizable difficulty, set prefered ball colors, set time


let colR = 0;
let colG = 0;
let colB = 0;
let isDragging = false;
let draggingSphere = null;
let offsetX = 0;
let offsetY = 0;
let genNum = 30; // Number of spheres
let gameSpeed = 5; // Controls how many spheres are updated each frame
let timeLeft = 45;
let spheresSorted = 0;
let waveNumber = 1;

// random x speed variables
let rXspeed1 = 1;
let rXspeed2 = 2;

// random y speed variables
let rYspeed1 = 1;
let rYspeed2 = 2;

let spheres = []; // Array to hold all the sphere objects

function setup() {
  createCanvas(600, 500);
  rectMode(CENTER);
  resetGame();
}

function draw() {
  background(220);
  
  if (timeLeft <= 0 && spheresSorted != genNum) {
    gameOver();
    return;
  }

  if (spheresSorted === genNum) {
    timeLeft = 0;
    waveNumber++;
    push();
    fill(0);
    textSize(30);
    text("WAVE  " + waveNumber, 255, 230);
    pop();
    resetGame();
  }

  push();
  fill(0);
  textSize(40);
  text("TIME  " + timeLeft, 230, 270);
  textSize(30);
  text("WAVE  " + waveNumber, 250, 230);
  pop();

  blueZone();
  redZone();

  // Update spheres and move them
  for (let i = 0; i < genNum; i++) {
    spheres[i].display();
    spheres[i].move();
  }

  text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);

  if (draggingSphere && draggingSphere.isDragged) {
    draggingSphere.xpos = mouseX - offsetX;
    draggingSphere.ypos = mouseY - offsetY;
  }

  timeCount(); // Update timer countdown
  difficulty(); // Wave speed increase
}

function timeCount() {
  if (frameCount % 60 === 0 && timeLeft > 0) {
    timeLeft--;
  }
}

function resetGame() {
  spheresSorted = 0;
  spheres = [];
  
  // Create new spheres for the next wave
  for (let i = 0; i < genNum; i++) {
    let xpos = random(50, width - 50);
    let ypos = random(50, height - 50);
    let xspeed = random(rXspeed1, rXspeed2) * (random() < 0.5 ? -1 : 1);
    let yspeed = random(rYspeed1, rYspeed2) * (random() < 0.5 ? -1 : 1);
    let color = random() < 0.5 ? [0, 0, 255] : [255, 0, 0];
    let sphere = new sortingSphere(
      xpos,
      ypos,
      xspeed,
      yspeed,
      40,
      color[0] === 0 ? "blue" : "red",
      10,
      color[0],
      color[1],
      color[2],
      false,
      true
    );
    spheres.push(sphere);
  }

  // Reset the timer and start a new wave with increased difficulty
  timeLeft = 45;
  difficulty();
}

function gameOver() {
  // Display game over message
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2);
}

function difficulty() {
  if (waveNumber === 1 || waveNumber === 2) {
    rXspeed1 = 1;
    rXspeed2 = 2;
    rYspeed1 = 1;
    rYspeed2 = 2;
  } else if (waveNumber === 3 || waveNumber === 4) {
    rXspeed1 = 2;
    rXspeed2 = 3;
    rYspeed1 = 2;
    rYspeed2 = 3;
  } else if (waveNumber === 5 || waveNumber === 6) {
    rXspeed1 = 3;
    rXspeed2 = 4;
    rYspeed1 = 3;
    rYspeed2 = 4;
  } else if (waveNumber === 7 || waveNumber === 8) {
    rXspeed1 = 4;
    rXspeed2 = 5;
    rYspeed1 = 4;
    rYspeed2 = 5;
  } else if (waveNumber >= 9) { //good luck LMAO
    rXspeed1 = 5;
    rXspeed2 = 6;
    rYspeed1 = 5;
    rYspeed2 = 6;
  }
}

class sortingSphere {
  constructor(
    xpos,
    ypos,
    xspeed,
    yspeed,
    size,
    type,
    time,
    colR,
    colG,
    colB,
    isDragged,
    canDrag
  ) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.size = size;
    this.type = type;
    this.time = time; // Time before it "explodes"
    this.colR = colR;
    this.colG = colG;
    this.colB = colB;
    this.isDragged = isDragged;
    this.canDrag = canDrag;
    this.droppedInZone = false; // Track if the sphere is dropped in the zone
  }

  display() {
    fill(this.colR, this.colG, this.colB);
    ellipse(this.xpos, this.ypos, this.size);
  }

 move() {
    // Only allow movement if the sphere is inside the zone
    if (this.droppedInZone) {
      // Restrict movement to within the zone (blue or red)
      if (this.type === "blue" && this.ypos > 100 && this.ypos < 200) {
        this.xpos += this.xspeed;
        this.ypos += this.yspeed;

        // Bounce off the walls inside the blue zone
        if (this.xpos > 425 - this.size / 2 || this.xpos < 175 + this.size / 2) {
          this.xspeed *= -1;
        }
        if (this.ypos > 200 - this.size / 2 || this.ypos < 100 + this.size / 2) {
          this.yspeed *= -1;
        }
      }

      if (this.type === "red" && this.ypos > 400 && this.ypos < 500) {
        this.xpos += this.xspeed;
        this.ypos += this.yspeed;

        // Bounce off the walls inside the red zone
        if (this.xpos > 425 - this.size / 2 || this.xpos < 175 + this.size / 2) {
          this.xspeed *= -1;
        }
        if (this.ypos > 500 - this.size / 2 || this.ypos < 400 + this.size / 2) {
          this.yspeed *= -1;
        }
      }
    } else {
      // Regular movement when not in the zone
      if (!this.isDragged) {
        this.xpos += this.xspeed;
        this.ypos += this.yspeed;

        // Bounce off walls
        if (this.xpos > width - this.size / 2 || this.xpos < this.size / 2) {
          this.xspeed *= -1;
        }
        if (this.ypos > height - this.size / 2 || this.ypos < this.size / 2) {
          this.yspeed *= -1;
        }
        // Bounce off blue zone
        if (
          this.xpos > 175 &&
          this.xpos < 425 &&
          this.ypos > 0 &&
          this.ypos < 100
        ) {
          this.yspeed *= -1;
          this.ypos = 100 + this.size / 2;
        }

        // Bounce off red zone
        if (
          this.xpos > 175 &&
          this.xpos < 425 &&
          this.ypos > 400 &&
          this.ypos < 500
        ) {
          this.yspeed *= -1;
          this.ypos = 400 - this.size / 2;
        }
      }
    }
  }
}

function blueZone() {
  push();
  fill(0, 0, 200);
  strokeWeight(5);
  rect(300, 50, 250, 100);
  pop();
}

function redZone() {
  push();
  fill(200, 0, 0);
  strokeWeight(5);
  rect(300, 450, 250, 100);
  pop();
}

function mousePressed() {
  for (let sphere of spheres) {
    let d = dist(mouseX, mouseY, sphere.xpos, sphere.ypos);
    if (sphere.canDrag && d < sphere.size / 2) {
      draggingSphere = sphere;
      sphere.isDragged = true;
      offsetX = mouseX - sphere.xpos;
      offsetY = mouseY - sphere.ypos;
      break;
    }
  }
}

function mouseReleased() {
  if (draggingSphere) {
    // Check if dropped in the blue zone
    if (
      draggingSphere.type === "blue" &&
      mouseX > 175 &&
      mouseX < 425 &&
      mouseY > 0 &&
      mouseY < 100
    ) {
      draggingSphere.droppedInZone = true;
      draggingSphere.canDrag = false;
      spheresSorted++;
      console.log("Dropped blue sphere in blue zone!");
    }
    // Check if dropped in the red zone
    else if (
      draggingSphere.type === "red" &&
      mouseX > 175 &&
      mouseX < 425 &&
      mouseY > 400 &&
      mouseY < 500
    ) {
      draggingSphere.droppedInZone = true;
      draggingSphere.canDrag = false;
      spheresSorted++;
      console.log("Dropped red sphere in red zone!");
    } else {
      console.log("Sphere missed the zone!");
    }

    draggingSphere.isDragged = false;
    draggingSphere = null;
  }
}
