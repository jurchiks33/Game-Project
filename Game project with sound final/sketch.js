

var floorPos_y;

var gameChar_x;
var gameChar_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;

var collectables;

var canyons;

var treePos_x;
var treePos_y;
var tree_x;

var clouds;
var mountains;

var cameraPosX;

var game_score;
var lives;

var platforms;

var flagpole;


var jumpSound;
var collectableSound;
var fallSound;
var victorySound;
var backgroundSound;
var zombieSound;

var enemies;

//sound commands below 
function preload()
{
    soundFormats('mp3','wav');
    
    jumpSound = loadSound('assets/jumps.wav');
    jumpSound.setVolume(0.1);
    
    collectableSound = loadSound('assets/Diamond.mp3');
    collectableSound.setVolume(0.1);
    
    fallSound = loadSound('assets/Fall And Hit.mp3');
    fallSound.setVolume(0.01);
    
    victorySound = loadSound('assets/Victory.mp3');
    victorySound.setVolume(0.2);
    
    backgroundSound = loadSound('assets/music.mp3');
    backgroundSound.setVolume(0.1);
    
    zombieSound = loadSound('assets/zombie.wav');
    zombieSound.setVolume(0.2);
}


function setup()
{
    createCanvas(1200, 1000);
    backgroundSound.loop();
    lives = 6;
    startGame();

}


function startGame()    
{   
    
    floorPos_y = height * 3/4;
    
    cameraPosX = 0;
    gameChar_x = 0;
    
    gameChar_x = width/4;
    gameChar_y = floorPos_y;
    
    scrollPos = 0;
    
    isLeft = false;
    isRight = false;
    isFalling = true;
    isJumping = false;
    isPlummeting = false;
    
    
    tree_x = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500];
    treePos_y = floorPos_y;
    
    clouds = [  
        {pos_x: random(-100, 5000), pos_y: random(100,500)},
        {pos_x: random(-100, 5000), pos_y: random(100,500)},
        {pos_x: random(-100, 5000), pos_y: random(100,500)},
        {pos_x: random(-100, 5000), pos_y: random(100,500)},
        {pos_x: random(-100, 5000), pos_y: random(100,500)},
        {pos_x: random(-100, 5000), pos_y: random(100,500)},
        {pos_x: random(-100, 5000), pos_y: random(100,500)},
        {pos_x: random(-100, 5000), pos_y: random(100,500)}
    ];
    
    mountains = [
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)},
        {pos_x: random(500, 5000), height: random(100,800)}
    ]
    

    collectables = [
         {x_pos: 1220, y_pos: floorPos_y - 310, size: 50, isFound: false},
         {x_pos: 1125, y_pos: floorPos_y, size: 50, isFound: false},
         {x_pos: 1850, y_pos: floorPos_y, size: 50, isFound: false},
         {x_pos: 2130, y_pos: floorPos_y, size: 50, isFound: false},
         {x_pos: 3600, y_pos: floorPos_y - 500, size: 50, isFound: false},
         {x_pos: 3660, y_pos: floorPos_y - 460, size: 50, isFound: false},
         {x_pos: 3690, y_pos: floorPos_y - 400, size: 50, isFound: false},
         {x_pos: 3720, y_pos: floorPos_y - 350, size: 50, isFound: false},
         {x_pos: 3750, y_pos: floorPos_y - 300, size: 50, isFound: false},
         {x_pos: 3770, y_pos: floorPos_y - 240, size: 50, isFound: false},
         {x_pos: 4280, y_pos: floorPos_y - 100, size: 50, isFound: false},
         {x_pos: 4540, y_pos: floorPos_y - 100, size: 50, isFound: false}
    ];
    
    canyons = [
        {x_pos: 700, width: 100},{x_pos: 900, width: 150},
        {x_pos: 1200, width: 160},{x_pos: 1700, width: 100},
        {x_pos: 1900, width: 150},{x_pos: 2200, width: 160},
        {x_pos: 2700, width: 100},{x_pos: 3900, width: 150},
        {x_pos: 4200, width: 160},{x_pos: 4500, width: 70}
    ];
    
    platforms = [];
    
    platforms.push(createPlatforms(850, floorPos_y - 100, 100));
    platforms.push(createPlatforms(1000,floorPos_y - 220, 100));
    platforms.push(createPlatforms(1200,floorPos_y - 300, 40));
    platforms.push(createPlatforms(3000,floorPos_y - 110, 100));
    platforms.push(createPlatforms(3150,floorPos_y - 230, 100));
    platforms.push(createPlatforms(3300,floorPos_y - 300, 80));
    platforms.push(createPlatforms(3450,floorPos_y - 400, 60));

   
    game_score = 0;
    
    flagpole = {isReached: false, x_pos: 5000};
    
    lives -= 1;
    
    enemies = [];
    enemies.push(new enemy(500, floorPos_y - 10, 100));
    enemies.push(new enemy(1080, floorPos_y - 10, 100));
    enemies.push(new enemy(1380, floorPos_y - 10, 310));
    enemies.push(new enemy(1580, floorPos_y - 10, 100));
    enemies.push(new enemy(2080, floorPos_y - 10, 100));
    enemies.push(new enemy(2380, floorPos_y - 10, 300));
    enemies.push(new enemy(2880, floorPos_y - 10, 300));
    enemies.push(new enemy(3000, floorPos_y - 10, 200));
    enemies.push(new enemy(3300, floorPos_y - 10, 250));
    enemies.push(new enemy(3480, floorPos_y - 10, 400));
}

function draw()
{
	background(100, 155, 255); //sky color

	noStroke();
	fill(0,155,0);
	rect(0, 750, 5000, 370); //ground color and size
          
   
    push();
    translate(-cameraPosX, 0);
    
      drawMountains();
    
    
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    
     //sun 
        fill(255, 255, 153, 80)
        ellipse(1900, 60, 600, 600);
        fill(255, 255, 153, 80)
        ellipse(1900, 60, 400, 400);
        fill(255, 231, 3);
        ellipse(1900, 60, 200, 200);
    
     ///Clouds///
        drawClouds();
     
    
    // draw collectable
    
    for (var i = 0; i < collectables.length; i++)
        {
            if(!collectables[i].isFound)
                {
                    drawCollectable(collectables[i]);
                    checkCollectable(collectables[i]);
                }
        }
    
    //canyons
      
    for(var i = 0; i < canyons.length; i++)
        {
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);
        }
    
    ///UFO drawing/////  
        stroke(random(70, 200), 96, 0);
        fill(102, 0, 51);
        ellipse(1000, 80, 120, 100);
        fill(192, 192, 192);
        ellipse(1000, 120, 500, 100);
        fill(96, 96, 96);
        ellipse(1000, 120, 480, 80);
        noStroke()
        fill(54, 54, 54);
        ellipse(1000, 120, 140, 50);
        fill(random(100, 255), 255, 153, 80);
        quad(1070, 120, 930, 120, 700, 600, 1300, 600);
    
    //TREES/////
    for (var i = 0; i < tree_x.length; i++) 
    {
//        console.log("tree loop" + i );
            fill(153, 76, 0);
        rect(tree_x[i] + 300, floorPos_y - 50, 20, 50);
        fill(7, 236, 30);
        ellipse(tree_x[i] + 300, floorPos_y - 50, 50, 50);
        ellipse(tree_x[i] + 320, floorPos_y - 50, 50, 50);
        ellipse(tree_x[i] + 320, floorPos_y - 70, 40, 40);
        ellipse(tree_x[i] + 300, floorPos_y - 70, 40, 40);
        ellipse(tree_x[i] + 310, floorPos_y - 90, 40, 40);
    }  
 
    
    //draw game char//
    

	if(isLeft && isFalling)
	{
        //jumping-left code
        fill(220, 20, 60);
        ellipse(gameChar_x -17, gameChar_y -65, 17, 10);   
        fill(0);
        ellipse(gameChar_x -22, gameChar_y -65, 6, 6);
        fill(255, 255, 153);
        ellipse(gameChar_x -23, gameChar_y -65, 5, 5);

    //right eye (small)
    
        fill(139, 0, 0);
        ellipse(gameChar_x +17, gameChar_y -65, 17, 10);
        fill(0);
        ellipse(gameChar_x +12, gameChar_y -65, 6, 6)
        fill(255, 255, 153);
        ellipse(gameChar_x +11, gameChar_y -65, 5, 5);
       
    //middle eye (big)
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -40, 25, 15);
        fill(0);
        ellipse(gameChar_x -7, gameChar_y -40, 10, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x -9.5, gameChar_y -40, 6, 6);
    
    //left eye (supersmall)
    
        fill(255, 69, 0);
        ellipse(gameChar_x -17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x -22, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -23, gameChar_y -30, 3, 3);
    
    //right eye (supersmall)

        fill(255, 69, 0);
        ellipse(gameChar_x +17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x +12, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +11, gameChar_y -30, 3, 3);
    
    //right eye very small
    
        fill(255, 69, 0);
        ellipse(gameChar_x +13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x +11, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +10, gameChar_y -48, 3, 2.5);
    
    //left eye very small
    
        fill(255, 80, 0);
        ellipse(gameChar_x -13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x -15, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -16, gameChar_y -48, 3, 2.5);
    
    //top eye vvery small
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -70, 8, 6);
        fill(0);
        ellipse(gameChar_x -2, gameChar_y -70, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -3, gameChar_y -70, 3, 2.5);
    
    //top eye middle big one
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -58, 14, 7.5);
        fill(0);
        ellipse(gameChar_x -4, gameChar_y -58, 5, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x -6, gameChar_y -58, 3, 2.5);
    
    //Body
    
        fill(140, 24, 148);
        ellipse (gameChar_x, gameChar_y -7, 20, 8);
        ellipse (gameChar_x +8, gameChar_y -7, 20, 8);
        ellipse (gameChar_x -8, gameChar_y -7, 20, 8);
        ellipse (gameChar_x -8, gameChar_y -10, 20, 8);
        ellipse (gameChar_x -10, gameChar_y -10, 20, 8);
        ellipse (gameChar_x +10, gameChar_y -10, 20, 8);
        ellipse (gameChar_x, gameChar_y -12, 20, 20);
    
        fill(153, 255, 255);
        ellipse (gameChar_x +2, gameChar_y -7, 3, 5);
        ellipse (gameChar_x +8, gameChar_y -14, 5, 3);
        ellipse (gameChar_x -8, gameChar_y -9, 3, 5);
        ellipse (gameChar_x +10, gameChar_y -5, 3, 5);
        ellipse (gameChar_x, gameChar_y -15, 3, 5);
    
    //Neck
    
        fill(255, 0, 0);
        strokeWeight(1);
        stroke(0) ;
        line(gameChar_x, gameChar_y -27, gameChar_x, gameChar_y -20);
        line(gameChar_x, gameChar_y -22, gameChar_x +14, gameChar_y -27);
        line(gameChar_x, gameChar_y -22, gameChar_x -14, gameChar_y-27);
        line(gameChar_x +7.5, gameChar_y -40, gameChar_x +11, gameChar_y -45);
        line(gameChar_x -7.5, gameChar_y -40, gameChar_x -11, gameChar_y -45);
        line(gameChar_x -4.5, gameChar_y -49, gameChar_x -13, gameChar_y -60);
        line(gameChar_x +4.5, gameChar_y -49, gameChar_x +13, gameChar_y -60);
        line(gameChar_x +2, gameChar_y -67, gameChar_x +12, gameChar_y -58);
        line(gameChar_x -2, gameChar_y -67, gameChar_x -12, gameChar_y -58);
    
	}
	else if(isRight && isFalling)
	{
		// jumping-right code
        
        fill(220, 20, 60);
        ellipse(gameChar_x -17, gameChar_y -65, 17, 10);   
        fill(0);
        ellipse(gameChar_x -11, gameChar_y -65, 6, 6);
        fill(255, 255, 153);
        ellipse(gameChar_x -10, gameChar_y -65, 5, 5);
  
    //right eye (small)
    
        fill(139, 0, 0);
        ellipse(gameChar_x +17, gameChar_y -65, 17, 10);
        fill(0);
        ellipse(gameChar_x +22, gameChar_y -65, 6, 6)
        fill(255, 255, 153);
        ellipse(gameChar_x +23, gameChar_y -65, 5, 5);
     
    //middle eye (big)
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -40, 25, 15);
        fill(0);
        ellipse(gameChar_x +7, gameChar_y -40, 10, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x +9.5, gameChar_y -40, 6, 6);
    
    //left eye (supersmall)
    
        fill(255, 69, 0);
        ellipse(gameChar_x -17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x -12, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -11, gameChar_y -30, 3, 3);
    
    //right eye (supersmall)

        fill(255, 69, 0);
        ellipse(gameChar_x +17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x +23, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +24, gameChar_y -30, 3, 3);
    
    //right eye very small
    
        fill(255, 69, 0);
        ellipse(gameChar_x +13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x +15, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +16, gameChar_y -48, 3, 2.5);
    
    //left eye very small
    
        fill(255, 80, 0);
        ellipse(gameChar_x -13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x -11, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -10, gameChar_y -48, 3, 2.5);
    
    //top eye vvery small
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -70, 8, 6);
        fill(0);
        ellipse(gameChar_x +2, gameChar_y -70, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +3, gameChar_y -70, 3, 2.5);
    
    //top eye middle big one
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -58, 14, 7.5);
        fill(0);
        ellipse(gameChar_x +4, gameChar_y -58, 5, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x +6, gameChar_y -58, 3, 2.5);
    
    //Body
    
        fill(140, 24, 148);
        ellipse (gameChar_x, gameChar_y -7, 20, 8);
        ellipse (gameChar_x +8, gameChar_y -7, 20, 8);
        ellipse (gameChar_x -8, gameChar_y -7, 20, 8);
        ellipse (gameChar_x -8, gameChar_y -10, 20, 8);
        ellipse (gameChar_x -10, gameChar_y -10, 20, 8);
        ellipse (gameChar_x +10, gameChar_y -10, 20, 8);
        ellipse (gameChar_x, gameChar_y -12, 20, 20);
    
        fill(153, 255, 255);
        ellipse (gameChar_x +2, gameChar_y -7, 3, 5);
        ellipse (gameChar_x +8, gameChar_y -14, 5, 3);
        ellipse (gameChar_x -8, gameChar_y -9, 3, 5);
        ellipse (gameChar_x +10, gameChar_y -5, 3, 5);
        ellipse (gameChar_x, gameChar_y -15, 3, 5);
    
    //Neck
    
        fill(255, 0, 0);
        strokeWeight(1);
        stroke(0);
        line(gameChar_x, gameChar_y -27, gameChar_x, gameChar_y -20);
        line(gameChar_x, gameChar_y -22, gameChar_x +14, gameChar_y -27);
        line(gameChar_x, gameChar_y -22, gameChar_x -14, gameChar_y-27);
        line(gameChar_x +7.5, gameChar_y -40, gameChar_x +11, gameChar_y -45);
        line(gameChar_x -7.5, gameChar_y -40, gameChar_x -11, gameChar_y -45);
        line(gameChar_x -4.5, gameChar_y -49, gameChar_x -13, gameChar_y -60);
        line(gameChar_x +4.5, gameChar_y -49, gameChar_x +13, gameChar_y -60);
        line(gameChar_x +2, gameChar_y -67, gameChar_x +12, gameChar_y -58);
        line(gameChar_x -2, gameChar_y -67, gameChar_x -12, gameChar_y -58);

	}
	else if(isLeft)
	{
		//walking left code////
        
        fill(220, 20, 60);
        ellipse(gameChar_x -17, gameChar_y -65, 17, 10);   
        fill(0);
        ellipse(gameChar_x -22, gameChar_y -65, 6, 6);
        fill(255, 255, 153);
        ellipse(gameChar_x -23, gameChar_y -65, 5, 5);
  
    //right eye (small)
    
        fill(139, 0, 0);
        ellipse(gameChar_x +17, gameChar_y -65, 17, 10);
        fill(0);
        ellipse(gameChar_x +12, gameChar_y -65, 6, 6)
        fill(255, 255, 153);
        ellipse(gameChar_x +11, gameChar_y -65, 5, 5);
      
    //middle eye (big)
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -40, 25, 15);
        fill(0);
        ellipse(gameChar_x -7, gameChar_y -40, 10, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x -9.5, gameChar_y -40, 6, 6);
    
    //left eye (supersmall)
    
        fill(255, 69, 0);
        ellipse(gameChar_x -17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x -22, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -23, gameChar_y -30, 3, 3);
    
    //right eye (supersmall)

        fill(255, 69, 0);
        ellipse(gameChar_x +17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x +12, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +11, gameChar_y -30, 3, 3);
    
    //right eye very small
    
        fill(255, 69, 0);
        ellipse(gameChar_x +13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x +11, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +10, gameChar_y -48, 3, 2.5);
    
    //left eye very small
    
        fill(255, 80, 0);
        ellipse(gameChar_x -13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x -15, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -16, gameChar_y -48, 3, 2.5);
    
    //top eye vvery small
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -70, 8, 6);
        fill(0);
        ellipse(gameChar_x -2, gameChar_y -70, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -3, gameChar_y -70, 3, 2.5);
    
    //top eye middle big one
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -58, 14, 7.5);
        fill(0);
        ellipse(gameChar_x -4, gameChar_y -58, 5, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x -6, gameChar_y -58, 3, 2.5);
    
    //Body
    
        fill(140, 24, 148);
        ellipse (gameChar_x, gameChar_y -7, 20, 20);
        ellipse (gameChar_x +8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -10, 20, 20);
        ellipse (gameChar_x -10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x +10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x, gameChar_y -12, 20, 20);
    
        fill(153, 255, 255);
        ellipse (gameChar_x +2, gameChar_y -7, 5, 7);
        ellipse (gameChar_x +8, gameChar_y -14, 7, 5);
        ellipse (gameChar_x -8, gameChar_y -9, 5, 7);
        ellipse (gameChar_x -5, gameChar_y -2, 7, 5);
        ellipse (gameChar_x +10, gameChar_y -5, 5, 7);
        ellipse (gameChar_x -12, gameChar_y -15, 7, 5);
        ellipse (gameChar_x, gameChar_y -15, 5, 7);
    
    //Neck
    
        fill(255, 0, 0);
        strokeWeight(1);
        stroke(0);
        line(gameChar_x, gameChar_y -27, gameChar_x, gameChar_y -20);
        line(gameChar_x, gameChar_y -22, gameChar_x +14, gameChar_y -27);
        line(gameChar_x, gameChar_y -22, gameChar_x -14, gameChar_y-27);
        line(gameChar_x +7.5, gameChar_y -40, gameChar_x +11, gameChar_y -45);
        line(gameChar_x -7.5, gameChar_y -40, gameChar_x -11, gameChar_y -45);
        line(gameChar_x -4.5, gameChar_y -49, gameChar_x -13, gameChar_y -60);
        line(gameChar_x +4.5, gameChar_y -49, gameChar_x +13, gameChar_y -60);
        line(gameChar_x +2, gameChar_y -67, gameChar_x +12, gameChar_y -58);
        line(gameChar_x -2, gameChar_y -67, gameChar_x -12, gameChar_y -58);

	}
	else if(isRight)
	{
		// walking right code
        
        fill(220, 20, 60);
        ellipse(gameChar_x -17, gameChar_y -65, 17, 10);   
        fill(0);
        ellipse(gameChar_x -11, gameChar_y -65, 6, 6);
        fill(255, 255, 153);
        ellipse(gameChar_x -10, gameChar_y -65, 5, 5);

    //right eye (small)
    
        fill(139, 0, 0);
        ellipse(gameChar_x +17, gameChar_y -65, 17, 10);
        fill(0);
        ellipse(gameChar_x +22, gameChar_y -65, 6, 6)
        fill(255, 255, 153);
        ellipse(gameChar_x +23, gameChar_y -65, 5, 5);
      
    //middle eye (big)
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -40, 25, 15);
        fill(0);
        ellipse(gameChar_x +7, gameChar_y -40, 10, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x +9.5, gameChar_y -40, 6, 6);
    
    //left eye (supersmall)
    
        fill(255, 69, 0);
        ellipse(gameChar_x -17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x -12, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -11, gameChar_y -30, 3, 3);
    
    //right eye (supersmall)

        fill(255, 69, 0);
        ellipse(gameChar_x +17, gameChar_y -30, 15, 8);
        fill(0);
        ellipse(gameChar_x +23, gameChar_y -30, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +24, gameChar_y -30, 3, 3);
    
    //right eye very small
    
        fill(255, 69, 0);
        ellipse(gameChar_x +13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x +15, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +16, gameChar_y -48, 3, 2.5);
    
    //left eye very small
    
        fill(255, 80, 0);
        ellipse(gameChar_x -13, gameChar_y -48, 8, 6);
        fill(0);
        ellipse(gameChar_x -11, gameChar_y -48, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x -10, gameChar_y -48, 3, 2.5);
    
    //top eye vvery small
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -70, 8, 6);
        fill(0);
        ellipse(gameChar_x +2, gameChar_y -70, 4, 4);
        fill(255, 255, 153);
        ellipse(gameChar_x +3, gameChar_y -70, 3, 2.5);
    
    //top eye middle big one
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -58, 14, 7.5);
        fill(0);
        ellipse(gameChar_x +4, gameChar_y -58, 5, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x +6, gameChar_y -58, 3, 2.5);
    
    //Body
    
        fill(140, 24, 148);
        ellipse (gameChar_x, gameChar_y -7, 20, 20);
        ellipse (gameChar_x +8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -10, 20, 20);
        ellipse (gameChar_x -10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x +10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x, gameChar_y -12, 20, 20);
    
        fill(153, 255, 255);
        ellipse (gameChar_x +2, gameChar_y -7, 5, 7);
        ellipse (gameChar_x +8, gameChar_y -14, 7, 5);
        ellipse (gameChar_x -8, gameChar_y -9, 5, 7);
        ellipse (gameChar_x -5, gameChar_y -2, 7, 5);
        ellipse (gameChar_x +10, gameChar_y -5, 5, 7);
        ellipse (gameChar_x -12, gameChar_y -15, 7, 5);
        ellipse (gameChar_x, gameChar_y -15, 5, 7);
    
    //Neck
    
        fill(255, 0, 0);
        strokeWeight(1);
        stroke(0);
        line(gameChar_x, gameChar_y -27, gameChar_x, gameChar_y -20);
        line(gameChar_x, gameChar_y -22, gameChar_x +14, gameChar_y -27);
        line(gameChar_x, gameChar_y -22, gameChar_x -14, gameChar_y-27);
        line(gameChar_x +7.5, gameChar_y -40, gameChar_x +11, gameChar_y -45);
        line(gameChar_x -7.5, gameChar_y -40, gameChar_x -11, gameChar_y -45);
        line(gameChar_x -4.5, gameChar_y -49, gameChar_x -13, gameChar_y -60);
        line(gameChar_x +4.5, gameChar_y -49, gameChar_x +13, gameChar_y -60);
        line(gameChar_x +2, gameChar_y -67, gameChar_x +12, gameChar_y -58);
        line(gameChar_x -2, gameChar_y -67, gameChar_x -12, gameChar_y -58);

	}
	else if(isFalling || isPlummeting)
	{
		//jumping facing forwards code
        
        fill(220, 20, 60);
        ellipse(gameChar_x -17, gameChar_y -65, 10, 20);   
        fill(0);
        ellipse(gameChar_x -17, gameChar_y -65, 5, 18);
        fill(255, 255, 153);
        ellipse(gameChar_x -17, gameChar_y -71, 4, 5);
 
    //right eye (small)
    
        fill(139, 0, 0);
        ellipse(gameChar_x +17, gameChar_y -65, 10, 20);
        fill(0);
        ellipse(gameChar_x +17, gameChar_y -65, 5, 18)
        fill(255, 255, 153);
        ellipse(gameChar_x +17, gameChar_y -71, 4, 5);
    
    //middle eye (big)
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -40, 15, 25);
        fill(0);
        ellipse(gameChar_x, gameChar_y -40, 10, 25);
        fill(255, 255, 153);
        ellipse(gameChar_x, gameChar_y -44, 6, 18);
    
    //left eye (supersmall)
    
        fill(255, 69, 0);
        ellipse(gameChar_x -17, gameChar_y -30, 8, 15);
        fill(0);
        ellipse(gameChar_x -17, gameChar_y -30, 4, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x -17, gameChar_y -33, 2, 5);
    
    //right eye (supersmall)

        fill(255, 69, 0);
        ellipse(gameChar_x +17, gameChar_y -30, 8, 15);
        fill(0);
        ellipse(gameChar_x +17, gameChar_y -30, 4, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x +17, gameChar_y -33, 2, 5);
    
    //right eye very small
    
        fill(255, 69, 0);
        ellipse(gameChar_x +13, gameChar_y -48, 6, 7.5);
        fill(0);
        ellipse(gameChar_x +13, gameChar_y -48, 4, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x +13, gameChar_y -49.5, 3, 2.5);
    
    //left eye very small
    
        ellipse(gameChar_x -13, gameChar_y -48, 6, 7.5);
        fill(0);
        ellipse(gameChar_x -13, gameChar_y -48, 4, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x -13, gameChar_y -49.5, 3, 2.5);
    
    //top eye very small
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -70, 6, 7.5);
        fill(0);
        ellipse(gameChar_x, gameChar_y -70, 4, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x, gameChar_y -71.5, 3, 2.5);
    
    //top eye middle big one
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -58, 14, 7.5);
        fill(0);
        ellipse(gameChar_x, gameChar_y -58, 9, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x, gameChar_y -59.5, 3, 2.5);
       
    //Body
    
        fill(140, 24, 148);
        ellipse (gameChar_x, gameChar_y -7, 20, 20);
        ellipse (gameChar_x +8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -10, 20, 20);
        ellipse (gameChar_x -10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x +10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x, gameChar_y -12, 20, 20);
    
        fill(153, 255, 255);
        ellipse (gameChar_x +2, gameChar_y -7, 5, 7);
        ellipse (gameChar_x +8, gameChar_y -14, 7, 5);
        ellipse (gameChar_x -8, gameChar_y -9, 5, 7);
        ellipse (gameChar_x -5, gameChar_y -2, 7, 5);
        ellipse (gameChar_x +10, gameChar_y -5, 5, 7);
        ellipse (gameChar_x -12, gameChar_y -15, 7, 5);
        ellipse (gameChar_x, gameChar_y -15, 5, 7);
    
    //Neck
    
        fill(255, 0, 0);
        strokeWeight(1);
        stroke(0);
        line(gameChar_x, gameChar_y -27, gameChar_x, gameChar_y -20);
        line(gameChar_x, gameChar_y -22, gameChar_x +14, gameChar_y -27);
        line(gameChar_x, gameChar_y -22, gameChar_x -14, gameChar_y-27);
        line(gameChar_x +7.5, gameChar_y -40, gameChar_x +11, gameChar_y -45);
        line(gameChar_x -7.5, gameChar_y -40, gameChar_x -11, gameChar_y -45);
        line(gameChar_x -4.5, gameChar_y -49, gameChar_x -13, gameChar_y -60);
        line(gameChar_x +4.5, gameChar_y -49, gameChar_x +13, gameChar_y -60);
        line(gameChar_x +2, gameChar_y -67, gameChar_x +12, gameChar_y -58);
        line(gameChar_x -2, gameChar_y -67, gameChar_x -12, gameChar_y -58);

	}
	else
	{
		// standing front facing code
        
         fill(220, 20, 60);
        ellipse(gameChar_x -17, gameChar_y -65, 10, 20);   
        fill(0);
        ellipse(gameChar_x -17, gameChar_y -65, 5, 18);
        fill(255, 255, 153);
        ellipse(gameChar_x -17, gameChar_y -65, 5, 5);
    
    //right eye (small)
    
        fill(139, 0, 0);
        ellipse(gameChar_x +17, gameChar_y -65, 10, 20);
        fill(0);
        ellipse(gameChar_x +17, gameChar_y -65, 5, 18)
        fill(255, 255, 153);
        ellipse(gameChar_x +17, gameChar_y -65, 5, 5);
       
    //middle eye (big)
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -40, 15, 25);
        fill(0);
        ellipse(gameChar_x, gameChar_y -40, 10, 25);
        fill(255, 255, 153);
        ellipse(gameChar_x, gameChar_y -40, 6, 18);
    
    //left eye (supersmall)
    
        fill(255, 69, 0);
        ellipse(gameChar_x -17, gameChar_y -30, 8, 15);
        fill(0);
        ellipse(gameChar_x -17, gameChar_y -30, 4, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x -17, gameChar_y -30, 2, 5);
    
    //right eye (supersmall)

        fill(255, 69, 0);
        ellipse(gameChar_x +17, gameChar_y -30, 8, 15);
        fill(0);
        ellipse(gameChar_x +17, gameChar_y -30, 4, 10);
        fill(255, 255, 153);
        ellipse(gameChar_x +17, gameChar_y -30, 2, 5);
    
    //right eye very small
    
        fill(255, 69, 0);
        ellipse(gameChar_x +13, gameChar_y -48, 6, 7.5);
        fill(0);
        ellipse(gameChar_x +13, gameChar_y -48, 4, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x +13, gameChar_y -48, 3, 2.5);
    
    //left eye very small
    
        ellipse(gameChar_x -13, gameChar_y -48, 6, 7.5);
        fill(0);
        ellipse(gameChar_x -13, gameChar_y -48, 4, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x -13, gameChar_y -48, 3, 2.5);
    
    //top eye vvery small
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -70, 6, 7.5);
        fill(0);
        ellipse(gameChar_x, gameChar_y -70, 4, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x, gameChar_y -70, 3, 2.5);
    
    //top eye middle big one
    
        fill(255, 69, 0);
        ellipse(gameChar_x, gameChar_y -58, 14, 7.5);
        fill(0);
        ellipse(gameChar_x, gameChar_y -58, 9, 5);
        fill(255, 255, 153);
        ellipse(gameChar_x, gameChar_y -58, 3, 2.5);
     
    //Body
    
        fill(140, 24, 148);
        ellipse (gameChar_x, gameChar_y -7, 20, 20);
        ellipse (gameChar_x +8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -7, 20, 20);
        ellipse (gameChar_x -8, gameChar_y -10, 20, 20);
        ellipse (gameChar_x -10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x +10, gameChar_y -10, 20, 20);
        ellipse (gameChar_x, gameChar_y -12, 20, 20);
    
        fill(153, 255, 255);
        ellipse (gameChar_x +2, gameChar_y -7, 5, 7);
        ellipse (gameChar_x +8, gameChar_y -14, 7, 5);
        ellipse (gameChar_x -8, gameChar_y -9, 5, 7);
        ellipse (gameChar_x -5, gameChar_y -2, 7, 5);
        ellipse (gameChar_x +10, gameChar_y -5, 5, 7);
        ellipse (gameChar_x -12, gameChar_y -15, 7, 5);
        ellipse (gameChar_x, gameChar_y -15, 5, 7);
    
    //Neck
    
        fill(255, 0, 0);
        strokeWeight(1);
        stroke(0);
        line(gameChar_x, gameChar_y -27, gameChar_x, gameChar_y -20);
        line(gameChar_x, gameChar_y -22, gameChar_x +14, gameChar_y -27);
        line(gameChar_x, gameChar_y -22, gameChar_x -14, gameChar_y-27);
        line(gameChar_x +7.5, gameChar_y -40, gameChar_x +11, gameChar_y -45);
        line(gameChar_x -7.5, gameChar_y -40, gameChar_x -11, gameChar_y -45);
        line(gameChar_x -4.5, gameChar_y -49, gameChar_x -13, gameChar_y -60);
        line(gameChar_x +4.5, gameChar_y -49, gameChar_x +13, gameChar_y -60);
        line(gameChar_x +2, gameChar_y -67, gameChar_x +12, gameChar_y -58);
        line(gameChar_x -2, gameChar_y -67, gameChar_x -12, gameChar_y -58);

	}
 
    if(isLeft == true)
        {
            gameChar_x -= 4;
        }
    
    if(isRight == true)
        {
            gameChar_x += 4;
        }
    if(isJumping == true)
    {
        gameChar_y -= 1000;
    }
    
    if(gameChar_y < floorPos_y)
        {
            var isContact = false;
            for(var i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_x, gameChar_y) == true) 
                    {
                        isContact = true;
                        break;
                    }
                }
        if (isContact == false) {
            isFalling = true;
            gameChar_y += 4;
        } else {
            isFalling = false;
            isJumping = false; 
        }
        } else {
        isFalling = false;
        } 
    
    renderFlagpole();
    
    for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
            
            if(isContact)
                {
                    if(lives > 0)
                        {
                            startGame();
                            break;
                        }
                }
        }
    
    
    pop();
    
    fill(255);
    noStroke();
    textSize(30);
    text("score:" + game_score, 50, 200);
    fill(0, 255, 0);
    text("lives:" + lives, 50, 250);
   
    if(lives <= 0)
        {
            text("game over - press space to continue",
                width/2 - 100,height/2);
            return;
        }
    else if(flagpole.isReached)
        {
            text("level complete - press space to continue", 
                width/2 - 100,height/2);
            return;
        }
    
    if(gameChar_y > height)
        {
            if(lives > 0)startGame();
        }
    
    
    gameChar_x += 0;
    cameraPosX = gameChar_x - width/2;
    
    if(flagpole.isReached == false)
        {
          checkFlagpole();  
        }

}

///////////INTERACTION CODE///////////
function keyPressed()
{
    
    if(! isPlummeting){
                if(key == 'a') {
                isLeft = true;
            } else if(key == 'd'){
                isRight = true;
            }
            if(key == 'w'  || key == ' ') {
                    if(isFalling == false) {
                    gameChar_y -= 100;
                    jumpSound.play();
                }
            }    
        }
    
    if(keyCode == 37)
    {
        console.log("left arrow");
        isLeft = true;
    }
    else if(keyCode == 39)
    {
        console.log("right arrow");
        isRight = true;
    }
    if(keyCode == 87)
        {
           console.log("jumping");
            isJumping = true;
        }
    if(!isPlummeting)
        {
            if(key == "a")
                {
                    isLeft = true;
                }
            else if(key == "d")
                {
                    isRight = true;
                }
        }
    if (key == ' ' || key == ' ')
            {
        if(isFalling == false)
           {
               gameChar_y -= 100;
           }
        }   
}

function keyReleased()
{
    
        if(keyCode == 37)
    {
        console.log("left arrow");
        isLeft = false;
    }
    else if(keyCode == 39)
    {
        console.log("right arrow");
        isRight = false;
    }
    if(keyCode == 87)
        {
            console.log("jumping")
            isJumping = false;
        }
}

function drawClouds() {
    for (var i = 0; i < clouds.length; i++) {
        fill(255);
        ellipse(clouds[i].pos_x, clouds[i].pos_y, 55, 55);
        ellipse(clouds[i].pos_x + 25, clouds[i].pos_y, 35, 35);
        ellipse(clouds[i].pos_x + 45, clouds[i].pos_y, 25, 25);
    }
}

function drawMountains()
{
    for (var i = 0; i < mountains.length; i++)
        {
            fill(100);
            triangle(mountains[i].pos_x - mountains[i].height/2, floorPos_y,
                    mountains[i].pos_x, floorPos_y - mountains[i].height,
                    mountains[i].pos_x + mountains[i].height/2, floorPos_y);
        }
}


function drawCollectable(t_collectable)
{
    
            noFill();
            strokeWeight(5);
            stroke(220, 185, 0);
            ellipse(t_collectable.x_pos, t_collectable.y_pos - 20, t_collectable.size, t_collectable.size);
            stroke(0, 255, 0);
            ellipse(t_collectable.x_pos , t_collectable.y_pos - 20, t_collectable.size - 10, t_collectable.size - 10);
            stroke(0, 0, 255);
            ellipse(t_collectable.x_pos, t_collectable.y_pos - 20, t_collectable.size - 20, t_collectable.size - 20);
}

function checkCollectable(t_collectable)
{
    if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size)
        {
            t_collectable.isFound = true;
            game_score += 10;
            collectableSound.play();
        }
}

function drawCanyon(t_canyon)
{
    noStroke();
    fill(50, 50, 0);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}

function checkCanyon(t_canyon)
{
    
            if(gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
    {
            isPlummeting = true;
            isLeft = false;
            isRight = false;
    }
     if (isPlummeting == true)
    {
            gameChar_y +=4;
            fallSound.play();
    }
}

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255,0,255);
    noStroke();
    
    if(flagpole.isReached)
    {
        rect(flagpole.x_pos, floorPos_y - 250, 80, 50);
    }
    else
    {
        rect(flagpole.x_pos, floorPos_y - 50, 80, 50);
    }
    
    
    pop();
}

function checkFlagpole()
{
      var d = abs(gameChar_x - flagpole.x_pos);
    
    if(d < 15)
        {
            flagpole.isReached = true;
            victorySound.play();
        }
}

function createPlatforms(x, y, lenght)
{
    var p = 
    {
        x: x,
        y: y,
        lenght: lenght,
        draw: function()
            {
                fill(140, 71, 47);
            var cornerRadius = 10;
                rect(this.x, this.y, this.lenght, 15, 
                cornerRadius, cornerRadius, cornerRadius, cornerRadius);
                
                fill(24, 170, 67);
            var grassHeight = 5;
            var grassMargin = 2;
                rect(this.x + grassMargin, this.y - grassHeight - grassMargin,
                    this.lenght - 2 * grassMargin, grassHeight);
            },
            checkContact: function(gc_x, gc_y)
                {
                    if(gc_x > this.x && gc_x < this.x + this.lenght)
                {
                    var d = this.y - gc_y;
                    if(d >= 0 && d < 5)
                        {
                            return true;
                        }
                }
                    return false;
                }
    }
    return p;
}

function enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
    }
    


this.draw = function()
{
    this.update();    
  push();
  translate(this.currentX, floorPos_y);
    scale(0.5); // zombie scale
    fill(0, 255, 0); // zombie color
  noStroke();
    rect(-25, -80, 50, 80, 20, 20, 0, 0);
    fill(50);
    ellipse(-10, -40, 20, 20);
    ellipse(10, -40, 20, 20);
    fill(255);
    ellipse(-12, -42, 6, 6);
    ellipse(8, -42, 6, 6);
    fill(0);
    ellipse(-13, -42, 3, 3);
    ellipse(7, -42, 3, 3);
  pop();
    
    
}

this.checkContact = function(gc_x, gc_y)
{
    var d = dist(gc_x, gc_y, this.currentX, this.y)
    if(d < 20)
        {
            zombieSound.play();
            return true;
        }
    return false;
}

}
