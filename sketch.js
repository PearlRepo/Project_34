const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Mouse= Matter.Mouse;
const MouseConstraint= Matter.MouseConstraint;

var ground, platform;
var p1, p2, kp;
var bird1, bird2, bird3;
var world, engine;
var mConstraint;
var slingshot;

var redImg;
var pigImg,kpigImg, pigdie, kpigdie ;
var p1die, p2die, kpdie;
var bgImg;
var button;

var help, helpimg;

var woodBoximg, woodBox, woodPlankimg, woodPlank;
 var wb1, wb2, wb3, wb4, wp1, wp2, wp3;
 var back, readimg, read;

var turn= 1;
var score=10000;
var star= 0;

var sling1img, sling2img, sling1, sling2;

var bgsound, killsound;

var gamestate="inst";

function preload() {
  redImg = loadImage("./images/red.jpg");
  pigImg = loadImage("./images/piggy.jpg");
  kpigImg= loadImage("./images/kpiggy.jpg");
  pigdie= loadImage("./images/piggydie.jpg");
  kpigdie= loadImage("./images/kpiggydie.jpg");
  bgImg = loadImage("./images/bg.png");
  woodBoximg= loadImage("./images/wood1.png");
  woodPlankimg= loadImage("./images/wood2.png");
  btnimg= loadImage("./images/btn.png");
  helpimg= loadImage("./images/HELP.jpg");
  backimg= loadImage("./images/back.png");
  readimg= loadImage("./images/inst.jpg");
  sling1img= loadImage("./images/sling1.png");
  sling2img= loadImage("./images/sling2.png");

  bgsound= loadSound("./sounds/song.mp3");
  killsound= loadSound("./sounds/poof.mp3");


}

function setup() {
  canvas = createCanvas(windowWidth-20, windowHeight-20);
  engine = Engine.create();
  world = engine.world;

  bgsound.loop();
  bgsound.setVolume(0.8);

  ground = new Ground(width / 2, height - 10, width, 20);
  platform= new Ground(width/7, height-100, 400, 200);

  button= createSprite(width-50,50, 70,70);
  button.addImage(btnimg);;
  button.scale=0.04;

  help= createSprite(width/2, height/2, width-100, height-100);
  help.addImage(helpimg);
  help.scale= 0.75;
  help.visible= false;

  read= createSprite(width-350,50, 70,70);
  read.addImage(readimg);;
  read.scale=1.5;
  
  back= createSprite(windowWidth/6, windowHeight/9);
  back.addImage(backimg);
  back.scale= 2;
  back.visible=false;

  p1= new Pig(width/2+350, height/2.3, 50,50);
  console.log(p1.body.position.y);
  p2= new Pig(width/2+400, height/3, 70,70);
  kp= new KPig(width/2, height/9, 90,100);

  p1die = createSprite(width/2+300, height/1.22,60,60);
  p1die.addImage(pigdie);
  p1die.scale=0.15;
  p1die.visible=false;

  p2die = createSprite(width/2+405, height/3,70,70);
  p2die.addImage(pigdie);
  p2die.scale=0.22;
  p2die.visible=false;

  kpdie = createSprite(width/2, height/4.2,100,100);
  kpdie.addImage(kpigdie);
  kpdie.scale=0.7;
  kpdie.visible=false;
  

 sling1= createSprite(width/5+30,370, 70,70);
 sling1.addImage(sling1img);;
 sling1.scale=0.8;

 sling2= createSprite(width/5+5,330, 70,70);
 sling2.addImage(sling2img);;
 sling2.scale=0.8;

 bird1 = new Bird(width/5, 300, 30);
 //bird2 = new Bird(width/7, 300, 30);
// bird3 = new Bird(width/7, 300, 30);

  slingshot = new SlingShot(width/5, 300, bird1.body);

  woodBox= new WoodBox(width/2, height/1.4, 70, 70);
  woodPlank= new WoodPlank(width/2+400, height/2.5, 70, 20);

  wb1= new WoodBox(width/2-30, height/2, 70, 70);
  wb2= new WoodBox(width/2+390, height/2, 70, 70);
  wb3= new WoodBox(width/2+400, height/2, 70, 70);
  wb4= new WoodBox(width/2+400, height/2, 70, 70);

  wp1= new WoodPlank(width/2+200, height/3+50, 100, 20);
  wp2= new WoodPlank(width/2, height/3, 150, 20);
  wp3= new WoodPlank(width/2+400, height/6, 70, 20);

  var mouse = Mouse.create(canvas.elt);
  var options = {
    mouse: mouse
  };

  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);


}


function draw() {
  background(bgImg);

  if (mousePressedOver(button)|| touches.length>0) {
    help.visible=true;
    back.visible=true;
    read.destroy();
    sling1.visible=false;
    sling2.visible=false;
    touches=0;
 }

 if (mousePressedOver(back)|| touches.length>0) {
    help.visible=false;
    back.visible=false;
    sling1.visible=true;
    sling2.visible=true;
  //  read.destroy();
    gamestate= "start";
    touches=0;
    slingshot.attach(bird1.body);
 }

  Matter.Engine.update(engine);

  p1.show();
  p2.show();
  kp.show();

  woodBox.show();
  woodPlank.show();

  wb1.show();
  wb2.show();
  wb3.show();
  wb4.show();
  wp1.show();
  wp2.show();
  wp3.show();

  slingshot.show();

  bird1.show();
  //bird2.show();
  //bird3.show();

  detectcollision1(bird1,p1);
  detectcollision2(bird1,p2);
  detectcollision(bird1,kp);

  ground.show();
  platform.show();

textSize(30);
stroke("black");
strokeWeight(5);
console.log("STARRRRSSSS: ", star);
 text("Time: "+score, width/10, height/10);

 if(star==3){
  gamestate="win";
 }

 
 if (score===0) {

  score=0;
  Matter.World.remove(world, kp.body);
  gameOver();
  
 }

 if (star===3) {

  win();
  
 }

  //bird1kp();
  drawSprites();
}


function keyPressed() {
	if (keyCode === 32) {
    Matter.Body.setPosition(bird1.body, {x:width/5, y:300}) 
	  slingshot.attach(bird1.body);
   // gamestate = "start";
   // Turns = Turns +1;
	}
}

function mouseReleased() {
  if (gamestate=="start") {
    setTimeout(() => {
      slingshot.fly();
    }, 100);
  
    turn=turn-1;
  }

}

/*function bird1kp() {

      var collision = Matter.SAT.collides(bird1.body, p1.body);

      if (collision.collided) {
        Matter.World.remove(world, bird1.body);
        delete bird1;
       // bird1.body= null;
       bird1.visible= false;
       slingshot.attach(bird3.body);

        setTimeout(()=>{
          p1.remove();
          Matter.World.remove(world, p1.body);
          //kp.body= null;
          
        }, 100)

        

      }
    }*/

    function detectcollision1(bird,pig){
      birdBodyPosition=bird.body.position
      pigBodyPosition=pig.body.position
    
      
      var distance=dist(birdBodyPosition.x,birdBodyPosition.y,pigBodyPosition.x,pigBodyPosition.y)
      if (distance<=pig.w+bird.r){
        Matter.World.remove(world, pig.body);
        delete pig;
       pig.visible = false;
      console.log(score);
      console.log("COLLIDED");
      p1die.visible= true;
      star=1;
      killsound.play();
     } 
    }

    function detectcollision2(bird,pig){
      birdBodyPosition=bird.body.position
      pigBodyPosition=pig.body.position
    
      
      var distance=dist(birdBodyPosition.x,birdBodyPosition.y,pigBodyPosition.x,pigBodyPosition.y)
      if (distance<=pig.w+bird.r){
        Matter.World.remove(world, pig.body);
        delete pig;
       pig.visible = false;
      console.log(score);
      console.log("COLLIDED");
      p2die.visible= true;
      star=2;
      killsound.play();
     } 
    }

    function detectcollision(bird,pig){
      birdBodyPosition=bird.body.position
      pigBodyPosition=pig.body.position
    
      
      var distance=dist(birdBodyPosition.x,birdBodyPosition.y,pigBodyPosition.x,pigBodyPosition.y)
      if (distance<=pig.w+bird.r){
        Matter.World.remove(world, pig.body);
        delete pig;
       pig.visible = false;
      console.log(score);
      console.log("COLLIDED");
      kpdie.visible= true;
      star=3;
      killsound.play();
     }

     if (pig && gamestate=="start") {
      score= score-50;
     }
    }
    

    function gameOver() {
      swal(
        {
          title: "Game Over",
          text: "Time's up! The king is alive. Better luck next time!",
          imageUrl:"https://thumbs.gfycat.com/PopularTartCowbird-size_restricted.gif",
          imageSize: "300x300",
          confirmButtonText: "Try Again"
        },
    
        function(isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        },
      );
    
    }

    function win() {
      swal(
        {
          title: "Victory!",
          text: "You killed the king! Thanks for playing!",
          imageUrl:"https://play-lh.googleusercontent.com/ek6mWT_YIiF2oU6AKxxLWiEuwWjuE8udGy6t_HxlMih4wnnRPgPlrO0PQrbmXgvBDWgE=w600-h300-pc0xffffff-pd",
          imageSize: "300x300",
          confirmButtonText: "Play Again"
        },
        function(isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        }
      );
    }

