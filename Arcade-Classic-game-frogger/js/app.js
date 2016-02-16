// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = initialX;
  this.y = initialY;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //Here we first check if bug as gone beyond the canvas
  if (this.x < 510) {
    //calculation used for the movement of the enemy
    this.x += this.speed * dt;
  } else {
    //resets a random speed for bugs that have crossed
    this.speed = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    //This line will reset the same bug from the beginning of the canvas once its gone accross it
    this.x = Math.floor(Math.random() * (-100 - 300 + 1)) - 300;
    this.x += this.speed * dt;
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Default Starting position of player
var playerInitialX = 200,
  playerInitialY = 400;
var Player = function() {
  this.x = playerInitialX;
  this.y = playerInitialY;
  // The image/sprite for our hero 
  this.sprite = 'images/char-boy.png';
  this.update = function(dt) {};
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  this.handleInput = function(direction) {
    switch (direction) {
      case "up":
        //if it reaches the river, restart
        if (this.y < 83) {
          this.x = 200;
          this.y = 400;
          //otherwise decrement up by tile distance
        } else {
          this.y = this.y - 83;
        }
        break;
      case "down":
        //if player hasn't reached the ver
        if (this.y < 400) {
          this.y = this.y + 83;
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x = this.x - 101;
        }
        break;
      case "right":
        if (this.x < 400) {
          this.x = this.x + 101;
        }
        break;
      default:
        alert("please use arrow keys to move hero");
    }
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

function addBugs() {
  var rowEnemyOne = 60;
  var rowEnemyTwo = 140;
  var rowEnemyThree = 220;
  //randomize starting position of x between -100 and -400
  var x = Math.floor(Math.random() * (-100 - 300 + 1)) - 300;
  //creation of bugs, adding a speed variable would have simplified the code but first instance of bugs
  //always start at samwe speed
  var bob = new Enemy(x, rowEnemyThree, Math.floor(Math.random() * (400 - 100 +
    1)) + 100);
  var susan = new Enemy(x, rowEnemyTwo, Math.floor(Math.random() * (400 - 100 +
    1)) + 100);
  var sam = new Enemy(x, rowEnemyOne, Math.floor(Math.random() * (400 - 100 +
    1)) + 100);
  var gina = new Enemy(x, rowEnemyThree, Math.floor(Math.random() * (400 -
    100 + 1)) + 100);
  var anastasia = new Enemy(x, rowEnemyTwo, Math.floor(Math.random() * (400 -
    100 + 1)) + 100);
  var alan = new Enemy(x, rowEnemyOne, Math.floor(Math.random() * (400 - 100 +
    1)) + 100);
  allEnemies.push(bob);
  allEnemies.push(susan);
  allEnemies.push(sam);
  allEnemies.push(gina);
  allEnemies.push(anastasia);
  allEnemies.push(alan);
}
addBugs();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});