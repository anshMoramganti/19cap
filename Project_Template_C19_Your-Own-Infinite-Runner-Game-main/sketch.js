var space, enemy, ship, rocket, explosion, space1
var spaceImg, enemyImg, shipImg, rocketImg, explosionImg, space1Img

var distance = 0;
var lasers = 0;

var enemyGroup, rocketGroup;
var blaster;
var backgroundMusic
var resetBtn, resetBtnImg


function preload() {

  spaceImg = loadImage("space.jpg")
  enemyImg = loadImage("enemy.png")
  shipImg = loadImage("ship.png")
  rocketImg = loadImage("rocket.png")
  resetBtnImg = loadImage('reset.png')
  explosionImg = loadImage('end.png')


  blaster = loadSound('blaster-2-81267.mp3')
  backgroundMusic = loadSound('background_music.mp3')


}

function setup() {

  createCanvas(1500, 1000)
  space = createSprite(650, 0)
  space.addImage(spaceImg)
  space.scale = 1.6;

  //space1 = createSprite(650, 0)
  //space1.addImage(spaceImg)
  //space1.scale = 1.6;
  //space1.visible = false;

  resetBtn = createSprite(600,550);
  resetBtn.addImage(resetBtnImg);
  resetBtn.scale = 1;
  //resetBtn.visible = false;

  //explosion = createSprite(500,400)
  //explosion.addImage(explosionImg);
  //explosion.scale = 3;
  //explosion.visible = false;

  ship = createSprite(700, 650);
  ship.addImage(shipImg);
  ship.scale = 0.2;

  enemyGroup = new Group();
  rocketGroup = new Group();







}

function draw() {
  background(0)




  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(1)
  }



  if (keyDown("RIGHT_ARROW") && ship.x < 940) {
    ship.x = ship.x + 20
  }

  if (keyDown("LEFT_ARROW") && ship.x > 360) {
    ship.x = ship.x + -20
  }

  var select_enemies = Math.round(random(1, 2));

  if (World.frameCount % 25 == 0) {
    if (select_enemies == 1) {
      spawnEnemies();
    } else if (select_enemies == 2) {
      spawnRocket();
    }
  }




  space.velocityY = 5

  if (space.y > 750) {
    space.y = 0
  }



  if (enemyGroup.isTouching(ship) || rocketGroup.isTouching(ship)) {
    gameOver();
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 900, 30);



  distance = distance + Math.round(getFrameRate() / 50);
  space.velocityY = (6 + 2 * distance / 150);
}

function spawnEnemies() {
  enemy = createSprite(Math.round(random(360, 940)), -50)
  enemy.addImage(enemyImg);
  enemy.scale = .2
  enemy.velocityY = 10
  enemy.frameCount = 300
  enemyGroup.add(enemy);
}

function spawnRocket() {
  rocket = createSprite(Math.round(random(360, 940)) - 50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.6;
  rocket.velocityY = 10
  rocket.frameCount = 300
  rocketGroup.add(rocket);
}

function gameOver() {
  //enemyGroup.destroy();
  //rocketGroup.destroy();
  space.velocityY = 0;
  console.log(enemyGroup.y)
  //enemyGroup.destroyEach();
  //rocketGroup.destroyEach();
  ship.visible = false;
  distance = 0
  //explosion.visible = true

  //if(keyDown("DOWN_ARROW"))
  //{
   // lasers = lasers + 1
  //}
}

function reset()
{
    distance = 0
    ship.visible = true;
    

}



