//things to do (dont forget, idiot)
//nothing else we gotta do, yippee!!

let colR = 0;
let colG = 0;
let colB = 0;
let isDragging = false;
let draggingSphere = null;
let offsetX = 0;
let offsetY = 0;
let genNum = 20; // number of spheres
let gameSpeed = 5; // was used early in development but now im scared to delete it
let spheresSorted = 0;
let waveNumber = 1;
let timeLeft = 30;
let scene = 0;
let score = 0;
let highScore = 0;
let scoreMultiplier = 100; //score gained increased per wave
let devScore = 17600; //i challenge all players, you cannot beat me 
// random x speed variables
let rXspeed1 = 1;
let rXspeed2 = 2;
// random y speed variables
let rYspeed1 = 1;
let rYspeed2 = 2;
let spheres = [];
let slider;
let currentDifficulty = "Normal";
let selectionLeft = 0;
let selectionRight = 0;
let sphereimg;
let bg;
let gearicon;
let infoicon;
let font;
let totalspheresSorted;
let ballgif1;
let ballgif2;
let startGame;
let playerDeath;
let orbSorted;

function preload(){
  sphereimg = loadImage('assets/ball.png')
  gearimg = loadImage('assets/gear.png')
  infoimg = loadImage('assets/info.png')
  backimg = loadImage('assets/back1.png')
  backimg1 = loadImage('assets/back2.png')
  bg = loadImage('assets/gamebg.png')
  font = loadFont('assets/RetroGaming.ttf');
  ballgif1 = loadImage('assets/ballgif.gif');
  ballgif2 = loadImage('assets/ballgif2.gif');
  startGame = loadSound("assets/startgame.mp3");
  playerDeath = loadSound("assets/gameend.mp3");
  orbSorted = loadSound("assets/ballsorted.mp3");
}
function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent("sketch-holder");
  rectMode(CENTER);
  resetGame();
}

function draw() {
  sceneSwitch();
  console.log(currentDifficulty);
  //text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  //mouse coords
    difficulty();
}
//end of draw function is here btw

function timeCount() {
  if (frameCount % 60 === 0 && timeLeft > 0) {
    timeLeft--;
  }
}

function resetGame() {
  spheresSorted = 0;
  spheres = [];
  

  // create new spheres for the next wave
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

  // Reset the timer and start a new wave
  timeLeft = 30;
 
  
}

function gameOver() {
  // Display game over message
  scene = 2;
  background(99, 41, 51);
  push();
  fill(255);
  textFont(font);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 150);
  textSize(40);
  text("Your Score: " + score, width / 2, height / 2 - 70);
  textSize(30);
  text("Current Difficulty: " + currentDifficulty, width / 2, height / 2 - 20);
  text("Press 'Z' to save your stats!", width / 2, height / 2 + 125);
  text(
    "Press 'Enter' to go back",
    width / 2,
    height / 2 + 160
  );
  text(
    "to the main menu!",
    width / 2,
    height / 2 + 190
  );
  pop();

  if (score > highScore) {
    highScore = score;
  }
}

//saving score
function keyPressed() {
  if (key === "z" && scene === 2) {
    saveCanvas("myScore.png");
  }
}

function difficulty() {
  if (currentDifficulty === "Normal") {
    if (waveNumber === 1 || waveNumber === 2) {
      scoreMultiplier = 100;
      rXspeed1 = 1;
      rXspeed2 = 2;
      rYspeed1 = 1;
      rYspeed2 = 2;
    } else if (waveNumber === 3 || waveNumber === 4) {
      scoreMultiplier = 150;
      rXspeed1 = 2;
      rXspeed2 = 3;
      rYspeed1 = 2;
      rYspeed2 = 3;
    } else if (waveNumber === 5 || waveNumber === 6) {
      scoreMultiplier = 200;
       rXspeed1 = 2;
      rXspeed2 = 3;
      rYspeed1 = 2;
      rYspeed2 = 3;
    } else if (waveNumber === 7 || waveNumber === 8) {
      scoreMultiplier = 250;
      rXspeed1 = 3;
      rXspeed2 = 3.5;
      rYspeed1 = 3;
      rYspeed2 = 4;
    } else if (waveNumber >= 9) {
      scoreMultiplier = 400;
      rXspeed1 = 3;
      rXspeed2 = 3.5;
      rYspeed1 = 3;
      rYspeed2 = 4;
    }//easy mode
  } else if (currentDifficulty === "  Easy") {
    //this is too slow for me dude, but enjoy baby mode >:)
   if (waveNumber === 1 || waveNumber === 2) {
      scoreMultiplier = 50;
      rXspeed1 = 1;
      rXspeed2 = 1;
      rYspeed1 = 1;
      rYspeed2 = 1;
    } else if (waveNumber === 3 || waveNumber === 4) {
      scoreMultiplier = 100;
      rXspeed1 = 1;
      rXspeed2 = 2;
      rYspeed1 = 1;
      rYspeed2 = 2;
    } else if (waveNumber === 5 || waveNumber === 6) {
      scoreMultiplier = 150;
      rXspeed1 = 2;
      rXspeed2 = 1;
      rYspeed1 = 2;
      rYspeed2 = 2;
    } else if (waveNumber === 7 || waveNumber === 8) {
      scoreMultiplier = 200;
      rXspeed1 = 2;
      rXspeed2 = 2;
      rYspeed1 = 2;
      rYspeed2 = 2;
    } else if (waveNumber >= 9) {
      scoreMultiplier = 250;
      rXspeed1 = 2;
      rXspeed2 = 2;
      rYspeed1 = 2;
      rYspeed2 = 2;
    }
    //hard mode
  } else if (currentDifficulty === "  Hard") {
   if (waveNumber === 1 || waveNumber === 2) {
      scoreMultiplier = 150;
      rXspeed1 = 3;
      rXspeed2 = 4;
      rYspeed1 = 3;
      rYspeed2 = 4;
    } else if (waveNumber === 3 || waveNumber === 4) {
      scoreMultiplier = 300;
      rXspeed1 = 3.5;
      rXspeed2 = 4.5;
      rYspeed1 = 3.5;
      rYspeed2 = 4.5;
    } else if (waveNumber === 5 || waveNumber === 6) {
      scoreMultiplier = 450;
      rXspeed1 = 4.5;
      rXspeed2 = 3.5;
      rYspeed1 = 3.5;
      rYspeed2 = 4.5;
    } else if (waveNumber === 7 || waveNumber === 8) {
      scoreMultiplier = 600;
      rXspeed1 = 4.5;
      rXspeed2 = 3.5;
      rYspeed1 = 4.5;
      rYspeed2 = 3.5;
    } else if (waveNumber >= 9) {
      scoreMultiplier = 750;
      rXspeed1 = 3.5;
      rXspeed2 = 3.5;
      rYspeed1 = 4.5;
      rYspeed2 = 3.5;
    }
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
    push()
    tint(this.colR, this.colG, this.colB);
    image(sphereimg, this.xpos - 20, this.ypos - 20, this.size +10, this.size + 10);
    pop()
  }

  move() {
    // Only allow movement if the sphere is inside the zone
    if (this.droppedInZone) {
      // Restrict movement to within the zone (blue or red)
      if (this.type === "blue" && this.ypos > 0 && this.ypos < 100) {
        this.xpos += this.xspeed;
        this.ypos += this.yspeed;

        // Bounce off the walls inside the blue zone
        if (
          this.xpos > 425 - this.size / 2 ||
          this.xpos < 175 + this.size / 2
        ) {
          this.xspeed *= -1;
        }
        if (
          this.ypos > 200 - this.size / 2 ||
          this.ypos < 100 + this.size / 2
        ) {
          this.yspeed *= -1;
        }
      }

      if (this.type === "red" && this.ypos > 400 && this.ypos < 500) {
        this.xpos += this.xspeed;
        this.ypos += this.yspeed;

        // Bounce off the walls inside the red zone
        if (
          this.xpos > 425 - this.size / 2 ||
          this.xpos < 175 + this.size / 2
        ) {
          this.xspeed *= -1;
        }
        if (
          this.ypos > 500 - this.size / 2 ||
          this.ypos < 400 + this.size / 2
        ) {
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
//something something football reference idk i dont watch it
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
  //makes it so you cannot drag the ball offscreen
  if (draggingSphere && draggingSphere.isDragged) {
  draggingSphere.xpos = constrain(mouseX - offsetX, draggingSphere.size / 2, width - draggingSphere.size / 2);
  draggingSphere.ypos = constrain(mouseY - offsetY, draggingSphere.size / 2, height - draggingSphere.size / 2);
}

  if (draggingSphere) {
    // check if dropped in the blue zone
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
      score = score + scoreMultiplier;
      orbSorted.play();
      console.log("blue orb is in the blue zone");
    }
    // check if dropped in the red zone
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
      score = score + scoreMultiplier;
      orbSorted.play();
      console.log("red orb is in the red zone");
    } else {
      console.log("Sphere missed the zone!");
    }

    if (
      (draggingSphere.type === "red" &&
        mouseX > 175 &&
        mouseX < 425 &&
        mouseY > 0 &&
        mouseY < 100) ||
      (draggingSphere.type === "blue" &&
        mouseX > 175 &&
        mouseX < 425 &&
        mouseY > 400 &&
        mouseY < 500)
    ) {
      //death
      draggingSphere.droppedInZone = true;
      draggingSphere.canDrag = false;
      timeLeft = 0;
      return;
    }
    draggingSphere.isDragged = false;
    draggingSphere = null;
  }
}

function mainMenu() {
  background(34,46,91);
  scene = 0;
  push();
  textFont(font);
  textSize(40);
  fill(99, 41, 51)
  rect(width/2, height / 2 - 165, 550, 125)
  fill(255);
  text("ORBITAL ASSAULT", width / 2 - 215, height / 2 - 150);
  text("Press 'SPACE' to play!", width / 2 - 275, height / 2 + 50);
  textSize(30);
  text("HI SCORE: " + highScore, 200, 460);
  text("DEV HI SCORE: " + devScore, 125, 490);
  image(gearimg, 500, 405, 100, 100);
  image(infoimg, 0, 405, 100, 100);
  pop();
  
  push()
  tint(0, 0, 255)
  image(ballgif1, 0, 150, 100, 100)
  tint(255, 0, 0)
   image(ballgif2, 500, 155, 100, 100)
  pop()
}

function mainGame() {
  background(0);
  push()
  image(bg, 0, 0, 600, 500);
  pop()
  scene = 1;
  if (timeLeft <= 0 && spheresSorted != genNum) {  playerDeath.play();
    gameOver();
    return;
  }
  //end timer early if you sort them all
  if (spheresSorted === genNum) {
    timeLeft = 0;
    startGame.play();
    waveNumber++;
    push();
    textFont(font);
    fill(0);
    textSize(30);
    text("WAVE  " + waveNumber, 255, 230);
    pop();
    resetGame();
  }

  push();
  textFont(font);
  fill(0);
  textSize(40);
  text("TIME  " + timeLeft, 185, 270);
  textSize(30);
  text("WAVE  " + waveNumber, 190, 230);
  textSize(30);
  text("SCORE " + score, 190, 300);
  pop();

  blueZone();
  redZone();
  // Update spheres and move them
  for (let i = 0; i < genNum; i++) {
    spheres[i].display();
    spheres[i].move();
  }

  if (draggingSphere && draggingSphere.isDragged) {
    draggingSphere.xpos = mouseX - offsetX;
    draggingSphere.ypos = mouseY - offsetY;
  }

  timeCount(); // Update timer countdown

}

function infoScreen() {
  background(99, 41, 51);
  scene = 4;
  push();
  textFont(font);
  fill(255);
  textSize(40);
  text("HOW TO PLAY", width / 2 - 150, height / 2 - 150);
  textSize(25);
  text("Drag and drop the colored orbs", width / 2 - 250, height / 2 - 100);
  text(
    "into their correct zones before time",
    width / 2 - 290,
    height / 2 - 75
  );
   text(
    "runs out!",
    width / 2 - 50,
    height / 2 - 50
     );
  text(
    "Mix them up or run out of time and",
    width / 2 - 250,
    height / 2 + 0
  );
   text(
    "it's Game Over!",
    width / 2 - 100,
    height / 2 + 25
  );
  fill(255, 0, 0)
  text("YOU SHOULD PLAY THIS WITH A MOUSE!", width / 2 - 285, height / 2 + 85);
  fill(0);
  image(backimg1, 0, 400, 100, 100);
  pop();
  
  push()
  tint(0, 0, 255)
  image(ballgif1, 0, 0, 100, 100)
  tint(255, 0, 0)
   image(ballgif2, 500, 400, 100, 100)
  pop()
}

function settings() {
  background(99, 41, 51);
  scene = 3;
  push();
  textFont(font);
  fill(255);
  textSize(40);
  text("SETTINGS", width / 2 - 120, height / 2 - 150);
  textSize(30);
  text("Ball 1 Color    (Unused :p)", width / 2 - 250, height / 2 - 60);
  text("Ball 2 Color    (Unused :p)", width / 2 - 250, height / 2 - 20);
  text("Set Difficulty", width / 2 - 250, height / 2 + 20);
  text(currentDifficulty, width / 2 + 50, height / 2 + 20);
  fill(selectionLeft, 0, 0);
  text("<", width / 2 + 25, height / 2 + 20);
  fill(selectionRight, 0, 0);
  text(">", width / 2 + 185, height / 2 + 20);
  fill(0);
  image(backimg, 490, 400, 100, 100);
  pop();
  
   push()
  tint(0, 0, 255)
  image(ballgif1, 0, 400, 100, 100)
  tint(255, 0, 0)
   image(ballgif2, 500, 0, 100, 100)
  pop()
}
function sceneSwitch() {
  switch (scene) {
    case 0:
      mainMenu();
      if (keyCode === 32 && scene === 0) {
         startGame.play();
        scene = 1;
        score = 0;
        spheresSorted = 0;
        resetGame();
      }
      break;
    case 1:
      mainGame();
      break;
    case 2:
      gameOver();
      if (keyCode === ENTER && scene === 2) {
        scene = 0;
      }
      break;
    case 3:
      settings();
      break;
    case 4:
      infoScreen();
      break;
  }
}
//hovering over settings arrows
function mouseMoved() {
  if (
    mouseX < 342 &&
    mouseX > 324 &&
    mouseY > 248 &&
    mouseY < 267 &&
    scene === 3
  ) {
    selectionLeft = 255;
    //left side
  } else {
    selectionLeft = 0;
  }
  if (
    mouseX < 502 &&
    mouseX > 484 &&
    mouseY > 248 &&
    mouseY < 267 &&
    scene === 3
  ) {
    //right side
    selectionRight = 255;
  } else {
    selectionRight = 0;
  }
  
}
//main menu switching
function mouseClicked() {
  //go to settings
  if (
    mouseX < 600 &&
    mouseX > 500 &&
    mouseY > 407 &&
    mouseY < 500 &&
    scene === 0
  ) {
    scene = 3;
  } else if (
    mouseX < 600 &&
    mouseX > 500 &&
    mouseY > 407 &&
    mouseY < 500 &&
    scene === 3
  ) {
    scene = 0;
    //go to info
  } else if (
    mouseX < 100 &&
    mouseX > 0 &&
    mouseY > 407 &&
    mouseY < 500 &&
    scene === 0
  ) {
    scene = 4;
  } else if (
    mouseX < 100 &&
    mouseX > 0 &&
    mouseY > 407 &&
    mouseY < 500 &&
    scene === 4
  ) {
    scene = 0;
  } //click left arrow on difficulty on Normal
  else if (
    mouseX < 342 &&
    mouseX > 324 &&
    mouseY > 248 &&
    mouseY < 267 &&
    scene === 3 &&
    currentDifficulty === 'Normal'
  ) {
    orbSorted.play();
    currentDifficulty = "  Easy";
    //click right arrow on difficulty on Normal
  } else if (
    mouseX < 502 &&
    mouseX > 484 &&
    mouseY > 248 &&
    mouseY < 267 &&
    scene === 3 &&
    currentDifficulty === 'Normal'
  ) {
    orbSorted.play();
    currentDifficulty = "  Hard"
  } else if (
    mouseX < 342 &&
    mouseX > 324 &&
    mouseY > 248 &&
    mouseY < 267 &&
    scene === 3 && 
    currentDifficulty === "  Hard"
  ) {
    orbSorted.play();
    currentDifficulty = "Normal";
    //click left arrow on difficulty on Hard
  } else if (
    mouseX < 502 &&
    mouseX > 484 &&
    mouseY > 248 &&
    mouseY < 267 &&
    scene === 3 &&
    currentDifficulty === '  Easy'
  ) {
    orbSorted.play();
    currentDifficulty = "Normal"
  }
}
