var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(300,380,1200,10);
  ground.x=ground.width/2;
 // console.log(ground.x);
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true
}

 score = 0;

function draw() {
  
  background(220);
  
  //displaying score
  text("Score: "+ score, 500,50);

  if(gameState === PLAY){

    if(keyDown("space")&& monkey.y >= 100) {
          monkey.velocityY = -12;
     }
    //console.log(monkey.y)

      //add gravity
      monkey.velocityY = monkey.velocityY + 0.8

    // for moving the ground
     ground.velocityX=-4;

    if (ground.x < 0){
        ground.x = ground.width/2;
     }
    monkey.collide(ground);

    if(monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
      score = score + Math.round(frameCount/80);
    }
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }

    food();
    obstacle();

  }
  
  else if (gameState === END) {

     ground.velocityX = 0;
      monkey.velocityY = 0
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   }

  drawSprites();
  
}

function food(){
  if (frameCount % 80 === 0){
   var banana = createSprite(600,165,10,40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -6;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}

function obstacle(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(600,360,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    obstacle.velocityX = -6;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
}




