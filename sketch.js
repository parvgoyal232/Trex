var trex,ground,invisbileground,trex_running,trex_collided,groundimage;
var cloudgroup,obstaclesgroup,cloadimage,obstacle1,obstacle2,
obstacle3,obstacle4,obstacle5,obstacle6,restartimage,gameoverimage,gameover,restart;
var score = 0;
var PLAY = 1
var END = 0
var gameState = PLAY;


function preload (){
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png") ;
 trex_collided=loadImage("trex_collided.png");
 
 groundimage=loadImage("ground2.png");
  
 obstacle1=loadImage("obstacle1.png");
 obstacle2=loadImage("obstacle2.png");
 obstacle3=loadImage("obstacle3.png");
 obstacle4=loadImage("obstacle4.png");
 obstacle5=loadImage("obstacle5.png");
 obstacle6=loadImage("obstacle6.png");
  
 cloudimage=loadImage("cloud.png"); 
 
 restartimage=loadImage("restart.png");
  
 gameoverimage=loadImage("gameOver.png")
  
  
}

function setup() {
  createCanvas(600,200);
  trex=createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5
  
  ground=createSprite(200,185,400,20);
  ground.addImage("ground",groundimage)
  ground.x=ground.width/2;
  ground.velocityX=-(6+3*score/100);
  invisibleground=createSprite(200,190,400,10);
  invisibleground.visible=false
  
  cloudgroup=new Group();
  obstaclesgroup=new Group();
  
  gameover=createSprite(300,100);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart=createSprite(300,140);
  restart.addImage(restartimage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(180);
  
  if(gameState===PLAY){
   score = score + Math.round(getFrameRate()/60);
   if (keyDown("space")&& trex.y >= 159){
     trex.velocityY= -12;
  } 
   trex.velocityY = trex.velocityY+0.7;
  if(ground.x <0){
    ground.x = ground.width/2 ;
  }   
  spawnClouds();
  spawnobstacles(); 
   
  if(obstaclesgroup.isTouching(trex)){
    gameState=END; 
  }   
  }  
  
  else if(gameState===END){
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    
  
  
 
  }  
  
   if(mousePressedOver(restart)) {
    reset();
  }
  text("Score:"+ score,500,50);
  trex.collide(invisibleground);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
  
}

function spawnobstacles (){
  //creating the obstacles every 60 frames 
  if (frameCount % 60 === 0){
      var obstacles=createSprite(600,165,10,40);
      obstacles.velocityX = -6;
      var rand = Math.round (random(1,6));
     //to generate the obsctacles randomly 
     switch(rand){
        case 1:obstacles.addImage(obstacle1);
               break;
        case 2:obstacles.addImage(obstacle2);      
               break ;
        case 3:obstacles.addImage(obstacle3);
               break;
        case 4:obstacles.addImage(obstacle4);
              break;
        case 5:obstacles.addImage(obstacle5);
               break;
        case 6:obstacles.addImage(obstacle6);      
               break ;  
        default: break;    
      }
    
     obstacles.scale = 0.5;
     //memory leak
     obstacles.lifetime = 100;
     obstaclesgroup.add(obstacles);   
      
      
      
      
   }

}  

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesgroup.destroyEach();
  cloudgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
  
  
}
