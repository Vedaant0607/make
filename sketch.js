var PLAY = 1;
var END = 0;
var SHOOT = 2;
var gameState = PLAY;

var trex,boss,bossImg;
var ground, invisibleGround, groundImage,backdrop,backgroundImg;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle;
var hero, hero1, shoot, bullet, bulletImg,enemyBullet;
var score = 0;
var particles = [];
var particle = 0;
var death = 0;
var gameOver, restart;

function preload() {

    cloudImage = loadImage("cloud.png");
    hero = loadAnimation("hero1.png", "hero2.png", "hero3.png", "hero4.png", "hero5.png", "hero6.png", "hero7.png", "hero8.png", "hero9.png", "hero10.png");
    hero1 = loadAnimation("hero16.png", "hero16.png", "hero16.png", "hero16.png", "hero16.png", "hero16.png");

    shoot = loadImage("shoot.jpg");

    bulletImg = loadImage("bullet1.png");
    obstacle1 = loadAnimation("bigenemies.png", "bigenemies2.png", "bigenemies3.png", "bigenemies4.png", "bigenemies5.png");
    

    backgroundImg = loadAnimation("bg.jpg","bg.jpg","bg.jpg","bg.jpg");
    bossImg = loadImage("boss.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(800,400);
    trex = createSprite(50, 320, 20, 50);
    trex.addAnimation("PC", hero);
    trex.addAnimation("Croutch", hero1);
    trex.debug = true;
    
    
    
    backdrop = createSprite(400,200,800,400);
    backdrop.addAnimation("background",backgroundImg);
    backdrop.scale = 1.6;
    backdrop.x = backdrop.width / 2;
    backdrop.velocityX = -12;

   

   // ground = createSprite(400, 780, 800, 20);
  //  ground.addImage("ground", groundImage);

  bullet = createSprite(200, 310, 50, 50);
bullet.visible = false


    gameOver = createSprite(500, 400);
    gameOver.addImage("over",gameOverImg);

    restart = createSprite(550, 350);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(400, 330, 800, 10);
    invisibleGround.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();

}

function draw() {
    background(0);


    if (gameState === PLAY) {
        backdrop.velocityX = -12;

        if (keyDown(UP_ARROW)  ) {
            trex.changeAnimation("PC")
          
        }

        trex.velocityY = trex.velocityY + 0.8

        if (backdrop.x < 0) {
            backdrop.x = backdrop.width / 2;
        }
        if (keyWentDown("R")) {
            spawnBullet();  
            
        }
        
        trex.collide(invisibleGround);
      //  spawnClouds();
        spawnObstacles();
        if (obstaclesGroup.isTouching(bullet)) {
            // console.log(obstaclesGroup)
            console.log("hi")
               obstaclesGroup.destroyEach();
               bullet.visible = false;
               score = score+10;
           }  
        if(score === 2000){
            spawnBoss();
        }

    }

    else if (gameState === END) {
       
        backdrop.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        enemyBullet.destroy();        
        
        obstaclesGroup.setLifetimeEach(-1);
        textSize(50);
        text("you lose",400,200);
     }  
    drawSprites();
    text("Score: " + score, 500, 50);
     
}

function spawnClouds() {
    if (frameCount % 60 === 0) {

        var cloud = createSprite(800, 120, 40, 10);
        cloud.y = Math.round(random(80, 120));

        cloud.addImage("clouds",cloudImage);
        cloud.scale = 0.5;

        cloud.velocityX = -3;

        cloud.lifetime = 200;

        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;

        cloudsGroup.add(cloud);
    }
}


function spawnObstacles() {
    if (frameCount % 60 === 0) {
        obstacle = createSprite(800, 280, 10, 100);

        obstacle.addAnimation("obstacle", obstacle1);
        obstacle.debug = true;
        //console.log(obstacle.depth)
       //obstacle.scale = 0.9;
       enemyBullet = createSprite(700,250,15,10);
       enemyBullet.velocityX = -30; 
       enemyBullet.shapeColor = color("yellow");
        obstacle.velocityX = -12;

       // obstacle.scale = 0.5;

        obstacle.lifetime = 300;

        obstaclesGroup.add(obstacle);
       
    }
}
function spawnBullet() {
    bullet.x = trex.x;
    bullet.visible = true;
    bullet.addImage("shoot",bulletImg);
    bullet.scale = 0.05
    bullet.velocityX= 50;
    bullet.y = trex.y -20;
    //console.log(bullet.depth)

   
}


function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();



    score = 0;

}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        trex.changeAnimation("Croutch")

    }
}
function spawnBoss(){
   boss = createSprite(650,180,10,10);
   boss.addImage(bossImg);
   boss.scale = 0.3;
}