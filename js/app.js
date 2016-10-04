// Enemies our player must avoid

// ************ Below is the Enemy construct/class  **************

var Enemy = function() {
    
    this.enemyPosY = [63, 147, 229];        // Sets where the 3 rows of enemies move across the screen
    this.enemySpeed = [300, 500];           // Sets the speed of the enemies
    this.sprite = 'images/enemy-bug.png';   // Image/sprite for the enemies - provided in original code
    this.reset();                           // Used with line () to reset enemy when it's gone to far right
};

// ************ Below is the Enemy proto reset functions ************** 

Enemy.prototype.reset = function() {
    
    this.x = -75;                       // Sets how far the enemy goes off screen 
    this.y = this.getLocationY();       // Used to move enemy
    this.speed = this.getRandomSpeed(); // Used to move enemy
};

// ************ Below is the Enemy proto update function ************** 

Enemy.prototype.update = function(dt) { 

    var maxY = 500;                 // Sets maximum distance enemy travels before resetting at beginning. 
    this.x += this.speed * dt;      // Updates emeny's position and included dt (a time delta between ticks for consistency across computers).

    if (this.x > maxY) {
        this.reset();               // Works with line 10 to reset enemy to start over when it moves past 500 (as defined by maxY -if returns true).
    }
    

// ************** Collision detection (within Enemy.update) ***************

//Contributions to - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    var enemyBox = {x: this.x, y: this.y, width: 50, height: 75}; // enemyBox details
    var playerBox = {x: player.x, y: player.y, width: 50, height: 75}; // playerBox details


    if (enemyBox.x < playerBox.x + playerBox.width &&   // Compares enemyBox on x axis to playerBox plus it's width.
        enemyBox.x + enemyBox.width > playerBox.x &&    // Compares enemyBox plus it's width to playerBox os x axis).
        enemyBox.y < playerBox.y + playerBox.height &&  // Compares enemyBox on y axis to playerBox plus height.
        enemyBox.height + enemyBox.y > playerBox.y) {   // Compares enemyBox plus enemyBox to playerBox on y axis.

        player.resetPosition();
    } 
};


// ************** Below is the Enemy proto render function - draws sprite ************ 

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// ************** Below is the Enemy proto y-axis location function ************ 

Enemy.prototype.getLocationY = function() {
    return this.enemyPosY[Math.floor(Math.random() * this.enemyPosY.length)];
};


// ************** Below is the Enemy proto speed function ************ 

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.enemySpeed[0],
         maxSpeed = this.enemySpeed[1];
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};


// *********** Below is the Player construct/class  *************

var Player = function () {
    this.sprite = 'images/char-boy.png';    // Sets connection to image
    this.x = 200;                           // Sets starting point for player on x axis.
    this.y = 406;                           // Sets Starting point for player on y axis.
    // this.reset();
};


// ************ Below is the Player prototype update function ************** 

    Player.prototype.update = function() {                      
        if (this.x < 0) {                       // Sets left boundary
            this.x = 0;
        } else if (this.x > 400) {              // Sets right boundary
            this.x = 400;
        } else if (this.y < 0) {                // Sets top boundary
            this.y = 0;
            this.resetPosition();
        } else if (this.y > 406) {              // Sets botton boundary
            this.y = 406;
        }
    };


// ************ Below is the Player prototype render function **************

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

// ************ Below is the Player movement function ************** 


    Player.prototype.handleInput = function(key) {

    switch(key) {
        case 'left': 
            this.x -= 50; // Distance moved left
            break;
        case 'right': 
            this.x += 50; // Distance moved right
            break;
        case 'up': 
            this.y -= 42;  // distance moved up
            break;
        case 'down': 
            this.y += 42;  // distance moved down
            break;
    }
};


//***************** Reset Player ***************

        Player.prototype.resetPosition = function () {
          this.x = 200; // X Position
          this.y = 405; // Y Position
        };


// ************** Instantiating Enemy's (in array) and Player ***************** 

        var enemy1 = new Enemy();
        var enemy2 = new Enemy();
        var enemy3 = new Enemy();
        var allEnemies = [enemy1, enemy2, enemy3];
              

        var player = new Player();
                   

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







